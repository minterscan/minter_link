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
    @search="handleCoinSearch"
    dropdownClassName="form-dropdown"
  >
    <a-icon slot="suffixIcon" type="wallet" />
    <a-select-option v-for="(item, key) in coinsFiltered" :key="key" :value="item.id">
      {{ item.symbol }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { TxCoin } from '@/model/Tx'
import { ECoin } from '@/model/Wallet'
import { VNode } from 'vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

const MAX_COINS_COUNT = 6

@Component
export default class CoinSelect extends Vue {
  value = ECoin.BIP
  coinsFiltered: TxCoin[] = []

  @Prop() change!: Function
  @Prop({ default: () => [] }) coins!: TxCoin[]
  @Prop({ default: 'Coin' }) placeholder!: string

  @Watch('coins', { immediate: true })
  onCoinsChange (coins: TxCoin[]): void {
    this.coinsFiltered = coins.slice(0, MAX_COINS_COUNT)
  }

  @Watch('value', { immediate: true })
  onDefaultValueChange (value: string): void {
    this.change(value)
  }

  filterOption (input: string, option: VNode): boolean {
    if (!option.componentOptions) { return false }
    if (!option.componentOptions.children) { return false }
    if (!option.componentOptions.children.length) { return false }
    if (!option.componentOptions.children[0].text) { return false }

    return (
      option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    )
  }

  handleCoinSearch (input: string): void {
    const result: TxCoin[] = []
    const query = input.trim().toLowerCase()

    if (!query) {
      this.coinsFiltered = this.coins.slice(0, MAX_COINS_COUNT)
      return
    }

    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].symbol.toLowerCase().indexOf(query) === 0) {
        result.push(this.coins[i])
      }
    }

    this.coinsFiltered = result
  }
}
</script>
