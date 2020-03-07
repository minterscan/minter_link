<template>
  <a :href="url" target="_blank" :title="name || pubKey">
    <template v-if="name">{{ name }}</template>
    <template v-else>{{ pubKey | short }}</template>
  </a>
</template>

<script lang="ts">
import config from '@/config'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'ValidatorLink'
})
export default class ValidatorLink extends Vue {
  @Prop({ default: '' }) name!: string
  @Prop({ default: '' }) pubKey!: string

  get url (): string {
    return `${config.explorerBaseUrl}/validator/${this.pubKey}`
  }
}
</script>
