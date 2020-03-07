<template>
  <a :href="url" target="_blank" :title="height">
    <template>{{ height }}</template>
  </a>
</template>

<script lang="ts">
import config from '@/config'
import Base from '@/mixins/Base'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'BlockLink'
})
export default class BlockLink extends Base {
@Prop({ default: '' }) height!: string

get url (): string {
  return `${config.explorerBaseUrl}/block/${this.height}`
}
}
</script>
