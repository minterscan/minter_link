<template>
  <a class="cp validator-link" :href="url" target="_blank" :title="validator.name || pubKey">
    <!-- Icons -->
    <img v-if="validator.icon_url" :src="validator.icon_url" >

    <!-- Name -->
    <template v-if="validator.name">{{ validator.name }}</template>

    <!-- PubKey -->
    <template v-else>{{ pubKey | short }}</template>
  </a>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Validator } from '@/model/Validator'
import { Component, Mixins, Prop } from 'vue-property-decorator'

@Component({
  name: 'ValidatorLink'
})
export default class ValidatorLink extends Mixins(Base) {
  @Prop({ default: '' }) pubKey!: string

  get url (): string {
    return `${this.config.explorerBaseUrl}/validator/${this.pubKey}`
  }

  get validator (): Validator | undefined {
    return this.network.validators.find(item => item.public_key === this.pubKey)
  }
}
</script>
