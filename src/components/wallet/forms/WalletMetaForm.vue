<template>
  <div class="cp wallet-meta-form">
    <a-form>
      <a-form-item label="Label">
        <wallet-label-input :change="changeLabel" :fresh="fresh" />
      </a-form-item>
      <a-form-item label="Icon">
        <icon-picker :change="changeIcon" :fresh="fresh" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import IconPicker from '@/components/common/form/IconPicker.vue'
import WalletLabelInput from '@/components/common/form/WalletLabelInput.vue'

@Component({
  name: 'WalletMetaForm',
  components: { IconPicker, WalletLabelInput }
})
export default class WalletMetaForm extends Mixins(Base) {
  @Prop({ default: false }) fresh!: boolean
  @Prop() changeLabel!: Function
  @Prop() changeIcon!: Function
}
</script>
