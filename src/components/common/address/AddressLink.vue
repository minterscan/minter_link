<template>
  <a :href="url" target="_blank" :title="address">
    <template v-if="short">{{ address | short }}</template>
    <template v-else>{{ address }}</template>
  </a>
</template>

<script lang="ts">
import config from '@/config'
import Base from '@/mixins/Base'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'AddressLink'
})
export default class AddressLink extends Base {
  @Prop({ default: '' }) address!: string
  @Prop({ default: false }) short!: string

  get url (): string {
    return `${config.explorerBaseUrl}/address/${this.address}`
  }
}
</script>
