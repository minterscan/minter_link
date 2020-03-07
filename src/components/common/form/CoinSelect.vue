<template>
  <a-select
    showSearch
    size="large"
    @change="change"
    class="form-select"
    :placeholder="placeholder"
    :filterOption="false"
    optionFilterProp="children"
    @search="handleCoinSearch"
    dropdownClassName="form-dropdown"
  >
    <a-icon slot="suffixIcon" type="wallet" />
    <a-select-option v-for="(item, key) in coinsFiltered" :key="key" :value="item">
      {{ item }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { VNode } from 'vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

const MAX_COINS_COUNT = 6

@Component
export default class CoinSelect extends Vue {
  coinsFiltered: string[] = []

  @Prop() change!: Function
  @Prop({ default: () => [] }) coins!: string[]
  @Prop({ default: 'Coin' }) placeholder!: string

  @Watch('coins')
  onCoinsChange (coins: string[]) {
    this.coinsFiltered = coins.slice(0, MAX_COINS_COUNT)
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

  handleCoinSearch (input: string) {
    const result: string[] = []
    const query = input.trim().toLowerCase()

    if (!query) {
      this.coinsFiltered = this.coins.slice(0, MAX_COINS_COUNT)
      return
    }

    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].toLowerCase().indexOf(query) === 0) {
        result.push(this.coins[i])
      }
    }

    this.coinsFiltered = result
  }
}
</script>
