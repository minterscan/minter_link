<template>
  <ul class="cp color-picker">
    <li
      :style="{
        backgroundColor: item
      }"
      @click="set(item)"
      v-for="(item, key) in palette" :key="key"
    >
      <a-icon type="check" v-if="item === color" />
    </li>
  </ul>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

@Component
export default class ColorPicker extends Mixins(Base) {
  color = ''
  palette = [
    '#c52323',
    '#c52391',
    '#b523c5',
    '#9623c5',
    '#6923c5',
    '#5023c5',
    '#233dc5',
    '#235bc5',
    '#2380c5',
    '#23adc5',
    '#23c5b8',
    '#23c592',
    '#23c55e',
    '#23c52a',
    '#60c523',
    '#8cc523',
    '#c1c523',
    '#c59c23',
    '#c57e23',
    '#c56123'
  ]

  @Prop() change!: Function
  @Prop({ default: false }) fresh!: boolean

  @Watch('color')
  onColorChange (color: string) {
    this.change(color)
  }

  @Watch('state.wallet.meta.color', { immediate: true })
  onWalletColorChange (color: string) {
    if (this.fresh) { return }

    this.color = color
  }

  mounted () {
    if (this.fresh) {
      this.color = this.palette[0]
    }
  }

  set (color: string): void {
    this.color = color
  }
}
</script>
