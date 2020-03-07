<template>
  <span class="cp clipboard-button">
    <a-button :shape="shape" @click="copy()" :type="type" v-if="shape">
      <slot name="content">Copy</slot>
    </a-button>
    <a-button @click="copy()" :type="type" v-else>
      <slot name="content">Copy</slot>
    </a-button>
  </span>
</template>

<script lang="ts">
import * as clipboard from 'clipbrd'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'ClipboardButton'
})
export default class ClipboardButton extends Vue {
  @Prop({ default: '' }) text!: string
  @Prop({ default: '' }) shape!: string
  @Prop({ default: '' }) type!: string

  async copy (): Promise<void> {
    if (clipboard.isSupported()) {
      const success = clipboard.copy(this.text)

      if (success) {
        await this.$message.success('Copied')
      }
    }
  }
}
</script>
