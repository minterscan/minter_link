import Base from '@/mixins/Base'
import { ETxType } from '@/model/Tx'
import { AppEvent } from '@/model/App'
import { Validator } from '@/model/Validator'
import { MinterWalletBalance } from '@/model/Wallet'
import { Component, Mixins, Watch } from 'vue-property-decorator'

/**
 * Transaction form
 */

@Component
export default class TxForm extends Mixins(Base) {
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

  get invalid (): boolean {
    return true
  }

  get invalidPayload (): boolean {
    return (new TextEncoder().encode(this.payload)).length > 1024
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

  @Watch('withPayload')
  onWithPayloadChange () {
    this.payload = ''
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
    const fee = (baseFee + payloadFee) * FEE_UNIT

    return `${fee}`
  }

  async fetchValidators () {
    try {
      const validators = await this.postman.getValidators()

      this.validators = Object.freeze(validators.sort((a, b) => +a.stake > +b.stake ? -1 : 1))
    } catch (e) {
      this.ui.commitError(e.message)
    }
  }

  async fetchNetworkCoins () {
    try {
      const coins = await this.postman.getCoins()

      this.coins = Object.freeze(coins.map((item) => item.symbol))
    } catch (e) {
      this.ui.commitError(e.message)
    }
  }

  listen (): void {
    this.$root.$on(AppEvent.FormSubmit, this.submit)
    this.$root.$on(AppEvent.FormReset, this.reset)
  }

  submit (): void {
    this.loading = true
  }

  reset (): void {
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
