<template>
  <a-popover title="Message" trigger="click" v-model="visible">
    <template slot="content">{{ payload | base64 }}</template>
    <icon name="message" scale="2" />
  </a-popover>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'TxPayload',
  components: { Icon }
})
export default class TxPayload extends Base {
  visible = false

  @Prop({ default: '' }) payload!: string
}
</script>
