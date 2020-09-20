<template>
  <div class="cp field-amount">
    <a-input-number
      :min="0"
      size="large"
      :defaultValue="Number(defaultValue)"
      v-model.number="amount"
      decimalSeparator=","
      :placeholder="placeholder"
    />
    <a-icon type="up" @click="useMax()" class="icon" />
  </div>
</template>

<script lang="ts">
import Big from 'bignumber.js'
import Base from '@/mixins/Base'
import { Component, Prop, Watch, Mixins } from 'vue-property-decorator'

@Component
export default class FieldAmount extends Mixins(Base) {
  amount = ''
  isUseMax = false

  @Prop() max!: string
  @Prop() change!: Function
  @Prop({ default: '' }) defaultValue!: string
  @Prop({ default: 'Amount' }) placeholder!: string

  @Watch('defaultValue')
  onDefaultValueChange (value: string) {
    this.amount = value
  }

  @Watch('amount')
  onAmountChange (amount: string): void {
    const filteredAmount = this.$options.filters?.pretty(amount)

    if (amount !== filteredAmount) this.amount = amount
    if (new Big(this.amount).toFixed() !== new Big(this.max).toFixed()) this.isUseMax = false

    this.change(amount)
  }

  @Watch('max')
  onMaxChange (): void {
    if (this.isUseMax) this.useMax()
  }

  useMax (): void {
    this.isUseMax = true
    this.amount = this.max
  }
}
</script>
