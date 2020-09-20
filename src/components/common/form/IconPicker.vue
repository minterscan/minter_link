<template>
  <ul class="cp icon-picker">
    <li
      @click="set(item)"
      :class="{ active: item === icon }"
      v-for="(item, key) in palette" :key="key"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

@Component
export default class IconPicker extends Mixins(Base) {
  icon = ''
  palette = [
    '🦄',
    '🐹',
    '🦁',
    '🐼',
    '🦊',
    '🐻',
    '🐶',
    '🐱',
    '🐵',
    '🐷',
    '🐸',
    '🦋',
    '🐬',
    '🐋',
    '🦈',
    '🐠',
    '🦀',
    '🦐',
    '🐙',
    '🦑'
  ]

  @Prop() change!: Function
  @Prop({ default: false }) fresh!: boolean

  @Watch('icon')
  onIconChange (icon: string): void {
    this.change(icon)
  }

  @Watch('state.wallet.meta.icon', { immediate: true })
  onWalletIconChange (icon: string): void {
    if (this.fresh) { return }

    this.icon = icon
  }

  mounted (): void {
    if (this.fresh) {
      this.icon = this.palette[0]
    }
  }

  set (icon: string): void {
    this.icon = icon
  }
}
</script>
