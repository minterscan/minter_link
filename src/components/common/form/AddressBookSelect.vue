<template>
  <a-select
    showSearch
    size="large"
    @change="change"
    class="form-select"
    :defaultValue="defaultValue"
    :placeholder="placeholder"
    :filterOption="filterOption"
    optionFilterProp="children"
    dropdownClassName="form-dropdown"
  >
    <a-select-option v-for="(item, key) in addressBook.sorted" :key="key" :value="item.address">
      <div class="name">{{ item.label }}</div>
      <div class="public-key">{{ item.address }}</div>
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { VNode } from 'vue'
import Base from '@/mixins/Base'
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'

@Component
export default class WalletSelect extends Mixins(Base) {
  @Prop() change!: Function
  @Prop({ default: 'Contact' }) placeholder!: string

  get defaultValue (): string {
    if (!Object.keys(this.addressBook.sorted).length) return ''

    return Object.keys(this.addressBook.sorted)[0]
  }

  @Watch('defaultValue', { immediate: true })
  onDefaultValueChange (value: string) {
    this.change(value)
  }

  filterOption (input: string, option: VNode) {
    if (!option.componentOptions) { return false }
    if (!option.componentOptions.children) { return false }
    if (!option.componentOptions.children.length) { return false }
    if (!option.componentOptions.children[0].children) { return false }
    if (!option.componentOptions.children[1].children) { return false }
    if (!option.componentOptions.children[0].children[0].text) { return false }
    if (!option.componentOptions.children[1].children[0].text) { return false }

    return (
      option.componentOptions.children[0].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
      option.componentOptions.children[1].children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    )
  }
}
</script>
