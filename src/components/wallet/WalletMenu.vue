<template>
  <div class="cp wallet-menu" v-if="visible">
    <clipboard-button :text="state.wallet.address" type="primary" />
    <a-button type="primary" shape="circle" icon="setting" @click="editWallet()" />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { Component, Mixins } from 'vue-property-decorator'
import ClipboardButton from '@/components/common/ClipboardButton.vue'
import { ERouter } from '@/model/Router'

@Component({
  name: 'WalletMenu',
  components: { ClipboardButton }
})
export default class WalletMenu extends Mixins(Base) {
  get visible (): boolean {
    return this.$route.path === ERouter.Vault
  }

  editWallet (): void {
    this.$root.$emit(AppEvent.WalletMetaOpen)
  }
}
</script>
