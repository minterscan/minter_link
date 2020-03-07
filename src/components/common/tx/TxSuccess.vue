<template>
  <div class="hash" >
    <div>
      <icon name="send" scale="5" />
      <a :href="getHashUrl(hash)" target="_blank" :title="hash">Transaction was sent!</a>
    </div>
  </div>
</template>

<script lang="ts">
import config from '@/config'
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
    return `${config.explorerBaseUrl}/tx/${hash}`
  }
}
</script>
