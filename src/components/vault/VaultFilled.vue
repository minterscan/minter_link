<template>
  <div class="cp vault-filled">
    <div class="color" :style="`--color: ${state.wallet.meta.color}`">
      <div class="first"></div>
      <div class="second"></div>
    </div>
    <vault-wallet />
    <modal-wallet-edit />
    <modal-action-send v-if="actionSendVisible" />
    <modal-action-convert v-if="actionConvertVisible" />
    <modal-action-delegate v-if="actionDelegateVisible" />
    <modal-action-unbond v-if="actionUnbondVisible" />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component } from 'vue-property-decorator'
import VaultWallet from '@/components/vault/VaultWallet.vue'
import ModalActionSend from '@/components/wallet/modal/ActionSend.vue'
import ModalWalletEdit from '@/components/wallet/modal/WalletEdit.vue'
import ModalActionConvert from '@/components/wallet/modal/ActionConvert.vue'
import ModalActionDelegate from '@/components/wallet/modal/ActionDelegate.vue'
import ModalActionUnbond from '@/components/wallet/modal/ActionUnbond.vue'

@Component({
  name: 'VaultFilled',
  components: {
    ModalActionSend,
    ModalActionConvert,
    ModalActionDelegate,
    ModalActionUnbond,
    VaultWallet,
    ModalWalletEdit
  }
})
export default class VaultFilled extends Base {
  actionSendVisible = false
  actionConvertVisible = false
  actionDelegateVisible = false
  actionUnbondVisible = false

  mounted () {
    this.listen()
  }

  listen () {
    // Send
    this.$root.$on('wallet:action:send:open', () => {
      this.actionSendVisible = true
    })
    this.$root.$on('wallet:action:send:close', () => {
      this.actionSendVisible = false
    })

    // Convert
    this.$root.$on('wallet:action:convert:open', () => {
      this.actionConvertVisible = true
    })
    this.$root.$on('wallet:action:convert:close', () => {
      this.actionConvertVisible = false
    })

    // Delegate
    this.$root.$on('wallet:action:delegate:open', () => {
      this.actionDelegateVisible = true
    })
    this.$root.$on('wallet:action:delegate:close', () => {
      this.actionDelegateVisible = false
    })

    // Unbond
    this.$root.$on('wallet:action:unbond:open', () => {
      this.actionUnbondVisible = true
    })
    this.$root.$on('wallet:action:unbond:close', () => {
      this.actionUnbondVisible = false
    })
  }
}
</script>
