<template>
  <a class="cp validator-link" :href="url" target="_blank" :title="meta.name || pubKey">
    <!-- Icons -->
    <img v-if="meta.icon_url" :src="meta.icon_url" >

    <!-- Name -->
    <template v-if="meta.name">{{ meta.name }}</template>

    <!-- PubKey -->
    <template v-else>{{ pubKey | short }}</template>
  </a>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ValidatorMeta } from '@/model/Wallet'
import { Component, Mixins, Prop } from 'vue-property-decorator'

@Component({
  name: 'ValidatorLink'
})
export default class ValidatorLink extends Mixins(Base) {
  @Prop({ default: '' }) meta!: ValidatorMeta
  @Prop({ default: '' }) pubKey!: string

  get url (): string {
    return `${this.config.explorerBaseUrl}/validator/${this.pubKey}`
  }
}
</script>
