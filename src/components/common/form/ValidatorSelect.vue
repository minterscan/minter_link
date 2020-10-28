<template>
  <a-select
    showSearch
    size="large"
    @change="change"
    class="form-select"
    :placeholder="placeholder"
    :filterOption="filterOption"
    optionFilterProp="children"
    dropdownClassName="form-dropdown"
  >
    <a-select-option v-for="(item, key) in validators" :key="key" :value="item.public_key" :name="item.name">
      <div class="name" v-if="item.name">{{ item.name }}</div>
      <div class="public-key">{{ item.public_key }}</div>
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CoinSelect extends Vue {
  @Prop() change!: Function
  @Prop({ default: () => [] }) validators!: string[]
  @Prop({ default: 'Validator' }) placeholder!: string

  filterOption (input: string, option: VNode): boolean {
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
