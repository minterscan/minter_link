<template>
  <a-button
    :size="size"
    :type="type"
    shape="circle"
    icon="copy"
    @click="copy()"
  />
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
  @Prop({ default: 'default' }) size!: string

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
