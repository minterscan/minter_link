import Big from 'bignumber.js'
import Base from '@/mixins/Base'
import { pretty } from '@/services/Util'
import { ETxType, MultisendItem, Tx } from '@/model/Tx'
import { Component, Mixins } from 'vue-property-decorator'

/**
 * Transaction utils, thanks to https://github.com/shrpne
 */

@Component
export default class TxHelper extends Mixins(Base) {
  isMultisend (tx: Tx): boolean {
    return tx.type === ETxType.Multisend
  }

  isIncomeMultisend (tx: Tx): boolean {
    if (!this.state.wallet) { return false }
    if (!this.isMultisend(tx)) { return false }

    const isOutcomeMultisend = this.state.wallet.address === tx.from

    return !isOutcomeMultisend
  }

  isMultisendMultipleCoin (tx: Tx): boolean {
    if (!this.isMultisend(tx)) { return false }

    const currentUserDeliveryList = this.getMultisendDeliveryList(tx)

    if (!currentUserDeliveryList) return false

    return currentUserDeliveryList.some((delivery) => {
      return delivery.coin !== currentUserDeliveryList[0].coin
    })
  }

  hasAmount (tx: Tx) {
    return typeof this.getAmount(tx) !== 'undefined'
  }

  getAmount (tx: Tx) {
    return tx.data.value ||
      this.getConvertValue(tx) ||
      tx.data.stake ||
      tx.data.initial_amount ||
      (tx.data.check && tx.data.check.value) ||
      this.getMultisendValue(tx)
  }

  getMultisendCoin (tx: Tx): string {
    if (!this.isMultisend(tx)) { return '' }

    if (!this.isMultisendMultipleCoin(tx)) {
      const currentUserDeliveryList = this.getMultisendDeliveryList(tx)

      if (!currentUserDeliveryList) { return '' }
      if (!currentUserDeliveryList.length) { return '' }

      return currentUserDeliveryList[0].coin.symbol
    }

    return ''
  }

  getMultisendValue (tx: Tx): string {
    if (!this.isMultisend(tx)) { return '' }

    const currentUserDeliveryList = this.getMultisendDeliveryList(tx)

    if (!currentUserDeliveryList) { return '' }
    if (this.isMultisendMultipleCoin(tx)) { return '...' }

    return currentUserDeliveryList.reduce((accumulator: number, delivery: MultisendItem) => {
      return (new Big(accumulator)).plus(new Big(delivery.value)).toNumber()
    }, 0).toString()
  }

  getConvertValue (tx: Tx) {
    if (tx.type === ETxType.SellCoin || tx.type === ETxType.SellAllCoin) {
      return tx.data.value_to_sell
    }
    if (tx.type === ETxType.BuyCoin) {
      return tx.data.value_to_buy
    }
  }

  getAmountWithCoin (tx: Tx) {
    if (this.isMultisend(tx) && this.isMultisendMultipleCoin(tx)) {
      return 'Multiple coins'
    } else {
      return pretty(this.getAmount(tx) || 0) + ' ' + (
        tx.data.coin?.symbol ||
        tx.data.symbol ||
        this.getConvertCoinSymbol(tx) ||
        tx.data.check?.coin?.symbol ||
        this.getMultisendCoin(tx)
      )
    }
  }

  getConvertCoinSymbol (tx: Tx): string {
    if (!tx.data) return ''

    if (tx.type === ETxType.SellCoin || tx.type === ETxType.SellAllCoin) {
      return tx.data.coin_to_sell?.symbol || ''
    }

    if (tx.type === ETxType.BuyCoin) {
      return tx.data.coin_to_buy?.symbol || ''
    }

    return ''
  }

  getMultisendDeliveryList (tx: Tx): MultisendItem[] | undefined {
    if (!tx.data.list) { return undefined }

    const isOutcomeMultisend = !this.isIncomeMultisend(tx)

    return isOutcomeMultisend ? tx.data.list : tx.data.list.filter((delivery) => {
      if (!this.state.wallet) { return false }
      return this.state.wallet.address === delivery.to
    })
  }
}
