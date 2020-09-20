<template>
  <a-input
    ref="input"
    size="large"
    v-model="label"
    placeholder="Label"
  >
    <a-icon slot="prefix" type="flag" />
  </a-input>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Input from '@/mixins/Input'
import { VaultWallets } from '@/model/Vault'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

@Component
export default class WalletLabelInput extends Mixins(Base, Input) {
  label = ''

  @Prop() change!: Function
  @Prop({ default: false }) fresh!: boolean

  @Watch('label')
  onLabelChange (label: string) {
    this.change(label)
  }

  @Watch('state.vault.wallets', { immediate: true })
  onWalletsChange (wallets: VaultWallets): void {
    if (wallets && this.fresh) {
      this.label = `Wallet ${Object.keys(wallets).length + 1}`
    }
  }

  @Watch('state.wallet.meta.label', { immediate: true })
  onWalletColorChange (label: string): void {
    if (this.fresh) { return }

    this.label = label
  }
}
</script>
