<template>
  <a :href="url" target="_blank" :title="height">
    <template>{{ height }}</template>
  </a>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class BlockLink extends Base {
  @Prop({ default: '' }) height!: string

  get url (): string {
    return `${this.config.explorerBaseUrl}/block/${this.height}`
  }
}
</script>
