<template>
  <div class="hash" >
    <div>
      <icon class="success" name="success" scale="5" />
      <a-button icon="link" type="link" :href="getHashUrl(hash)" :title="hash" target="_blank">
        Transaction was sent!
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Mixins, Prop } from 'vue-property-decorator'

@Component({
  name: 'TxSuccess',
  components: { Icon }
})
export default class TxSuccess extends Mixins(Base) {
  @Prop({ default: '' }) hash!: string

  getHashUrl (hash: string): string {
    return `${this.config.explorerBaseUrl}/tx/${hash}`
  }
}
</script>
