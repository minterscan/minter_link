<template>
  <div class="actions">
    <clipboard-button :text="state.wallet.address" shape="circle">
      <a-icon type="copy" slot="content" />
    </clipboard-button>
    <a-button shape="circle" icon="setting" @click="editWallet()" />
    <a-button shape="circle" icon="close" @click="deleteWallet()" />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { Component, Mixins } from 'vue-property-decorator'
import ClipboardButton from '@/components/common/ClipboardButton.vue'

@Component({
  name: 'WalletMenu',
  components: { ClipboardButton }
})
export default class WalletMenu extends Mixins(Base) {
  editWallet (): void {
    this.$root.$emit(AppEvent.WalletMetaOpen)
  }

  deleteWallet (): void {
    this.$confirm({
      parentContext: this,
      title: 'Are you sure want to delete this wallet?',
      content: 'It can not be undone!',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          if (!this.state.vault) { return }

          const activeWallet = await this.postman.deleteWallet()
          this.state.commitVaultWalletDelete(this.state.vault.activeWallet)
          this.state.commitVaultActiveWallet(activeWallet)
        } catch (e) {
          this.ui.commitError(e.message)
        }
      }
    })
  }
}
</script>
