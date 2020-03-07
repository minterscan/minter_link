<template>
  <a :href="url" target="_blank" :title="hash">
    <template v-if="short">{{ hash | short }}</template>
    <template v-else>{{ hash }}</template>
  </a>
</template>

<script lang="ts">
import config from '@/config'
import Base from '@/mixins/Base'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'TxLink'
})
export default class TxLink extends Base {
  @Prop({ default: '' }) hash!: string
  @Prop({ default: false }) short!: string

  get url (): string {
    return `${config.explorerBaseUrl}/tx/${this.hash}`
  }
}
</script>
