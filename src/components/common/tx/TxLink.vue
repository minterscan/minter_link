<template>
  <a-button class="cp tx-link" icon="link" type="link" :href="url" target="_blank">
    <template v-if="short">{{ hash | short }}</template>
    <template v-else>{{ hash }}</template>
  </a-button>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class TxLink extends Base {
  @Prop({ default: '' }) hash!: string
  @Prop({ default: false }) short!: string

  get url (): string {
    return `${this.config.explorerBaseUrl}/tx/${this.hash}`
  }
}
</script>
