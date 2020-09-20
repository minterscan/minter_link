import Big from 'bignumber.js'
import Base from '@/mixins/Base'
import { ETxType } from '@/model/Tx'
import { AppEvent } from '@/model/App'
import { Validator } from '@/model/Validator'
import { ECoin, MinterWalletBalance } from '@/model/Wallet'
import { Component, Mixins, Watch } from 'vue-property-decorator'

/**
 * Transaction form
 */

@Component
export default class TxForm extends Mixins(Base) {
  type = ETxType.Send
  gasCoin: string = ECoin.BIP
  gasCoinBipPrice = 1
  coinToBuy = ''
  coinToSell = ''
  valueToBuy = ''
  valueToSell = ''
  maxAmount = ''
  coins: readonly string[] = []
  validators: readonly Validator[] = []
  walletCoins: string[] = []
  loading = false
  hash = ''
  payload = ''
  withPayload = false
  advanced = false

  get invalid (): boolean {
    return true
  }

  // Max payload size 1024 bytes
  // https://github.com/MinterTeam/minter-go-node/blob/master/core/transaction/executor.go#L20
  get invalidPayload (): boolean {
    return (new TextEncoder().encode(this.payload)).length > 1024
  }

  get gasCoinAmount (): string {
    if (!this.state.wallet) return '0'
    if (!this.state.wallet.balances) return '0'

    const balance = this.state.wallet.balances.find((item) => item.coin === this.gasCoin)

    if (!balance) return '0'

    return balance.amount
  }

  get fee (): string {
    return this.getFee(this.type)
  }

  get incufficientFeeFunds (): boolean {
    return !this.hash && new Big(this.gasCoinAmount).isLessThan(new Big(this.fee))
  }

  @Watch('state.wallet.balances', { immediate: true })
  onWalletBalancesChange (balances: MinterWalletBalance[]) {
    if (!balances) return

    this.walletCoins = balances.map((item) => item.coin).sort((a, b) => a < b ? -1 : 1)
  }

  @Watch('coinToBuy')
  @Watch('coinToSell')
  @Watch('valueToBuy')
  @Watch('valueToSell')
  onInputChange (): void {
    this.$root.$emit(AppEvent.FormInvalid, this.invalid)
  }

  @Watch('advanced')
  onWithPayloadChange (value: boolean) {
    this.payload = ''
    if (!value) this.gasCoin = ECoin.BIP
  }

  @Watch('gasCoin', { immediate: true })
  onGasCoinChange (value: string) {
    if (value !== ECoin.BIP) this.fetchGasCoinBipPrice()
  }

  mounted (): void {
    this.listen()
    this.fetchValidators()
    this.fetchNetworkCoins()
  }

  getFee (txType: ETxType): string {
    const FEE_UNIT = 0.001
    const fees: Record<string, number> = {
      [ETxType.Send]: 10,
      [ETxType.SellCoin]: 100,
      [ETxType.SellAllCoin]: 100,
      [ETxType.BuyCoin]: 100,
      [ETxType.Delegate]: 200,
      [ETxType.Unbond]: 200
    }

    const baseFee = fees[txType]
    const payloadBytesLength = (new TextEncoder().encode(this.payload)).length
    const payloadFee = payloadBytesLength ? payloadBytesLength * 2 : 0
    const fee = (baseFee + payloadFee) * FEE_UNIT * this.gasCoinBipPrice

    return `${fee}`
  }

  async fetchValidators () {
    try {
      const validators = await this.postman.getValidators()

      this.validators = Object.freeze(validators.sort((a, b) => +a.stake > +b.stake ? -1 : 1))
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  async fetchNetworkCoins () {
    try {
      const coins = await this.postman.getCoins()

      this.coins = Object.freeze(coins.map((item) => item.symbol))
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  async fetchGasCoinBipPrice () {
    try {
      const estimate = await this.postman.estimateSell({
        coinToBuy: ECoin.BIP,
        coinToSell: this.gasCoin,
        valueToSell: '1'
      })

      this.gasCoinBipPrice = new Big(estimate.will_get).dividedBy(10 ** 18).toNumber()
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  listen (): void {
    this.$root.$on(AppEvent.FormSubmit, this.submit)
    this.$root.$on(AppEvent.FormReset, this.resetForm)
  }

  changeGasCoin (coin: string): void {
    this.gasCoin = coin
  }

  submit (): void {
    this.loading = true
  }

  resetForm (): void {
    this.coinToBuy = ''
    this.coinToSell = ''
    this.valueToBuy = ''
    this.valueToSell = ''
    this.payload = ''
    this.hash = ''
  }

  destroyed () {
    this.$root.$off(AppEvent.FormSubmit)
    this.$root.$off(AppEvent.FormReset)
  }
}
