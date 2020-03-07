<template>
  <div class="cp wallet-meta-form">
    <a-form>
      <a-form-item label="Label">
        <wallet-label-input :change="changeLabel" :fresh="fresh" />
      </a-form-item>
      <a-form-item label="Color">
        <color-picker :change="changeColor" :fresh="fresh" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import ColorPicker from '@/components/common/form/ColorPicker.vue'
import WalletLabelInput from '@/components/common/form/WalletLabelInput.vue'

@Component({
  name: 'WalletMetaForm',
  components: { ColorPicker, WalletLabelInput }
})
export default class WalletMetaForm extends Mixins(Base) {
  @Prop({ default: false }) fresh!: boolean
  @Prop() changeLabel!: Function
  @Prop() changeColor!: Function
}
</script>
