<template>
  <a-select
    showSearch
    size="large"
    @change="change"
    class="form-select"
    :defaultValue="value"
    :placeholder="placeholder"
    :filterOption="filterOption"
    optionFilterProp="children"
    dropdownClassName="form-dropdown"
  >
    <a-icon slot="suffixIcon" type="wallet" />
    <a-select-option v-for="(item, key) in coins" :key="key" :value="item.coin">
      {{ item.coin }} ({{ item.amount | pretty }})
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { VNode } from 'vue'
import Base from '@/mixins/Base'
import { ECoin, MinterWalletBalance } from '@/model/Wallet'
import { Component, Prop, Mixins } from 'vue-property-decorator'

@Component
export default class CoinSelect extends Mixins(Base) {
  value: string = ECoin.BIP

  @Prop() change!: Function
  @Prop({ default: 'Coin' }) placeholder!: string

  get coins (): MinterWalletBalance[] {
    if (!this.state.wallet) return []
    if (!this.state.wallet.balances) return []

    return this.state.wallet.balances.slice().sort((a, b) => {
      if (a.coin === ECoin.BIP) return -1
      else return a.coin < b.coin ? -1 : 1
    })
  }

  mounted (): void {
    this.change(this.value)
  }

  filterOption (input: string, option: VNode) {
    if (!option.componentOptions) { return false }
    if (!option.componentOptions.children) { return false }
    if (!option.componentOptions.children.length) { return false }
    if (!option.componentOptions.children[0].text) { return false }

    return (
      option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    )
  }
}
</script>
