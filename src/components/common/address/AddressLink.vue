<template>
  <a-button class="cp address-link" icon="link" type="link" :href="url" target="_blank">
    <template v-if="short">{{ address | short }}</template>
    <template v-else>{{ address }}</template>
  </a-button>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class AddressLink extends Base {
  @Prop({ default: '' }) address!: string
  @Prop({ default: false }) short!: string

  get url (): string {
    return `${this.config.explorerBaseUrl}/address/${this.address}`
  }
}
</script>
