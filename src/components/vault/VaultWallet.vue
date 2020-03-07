<template>
  <div class="cp vault-wallet">
    <!-- Label & BIP balance -->
    <wallet-info />

    <!-- Actions menu -->
    <wallet-actions-menu />

    <!-- Data menu -->
    <wallet-data-menu />

    <!-- Txs -->
    <wallet-txs />

    <!-- Balances -->
    <wallet-balances />

    <!-- Delegations -->
    <wallet-delegations />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Wallet from '@/mixins/Wallet'
import WalletTxs from '@/components/wallet/WalletTxs.vue'
import WalletInfo from '@/components/wallet/WalletInfo.vue'
import { Component, Mixins } from 'vue-property-decorator'
import WalletDataMenu from '@/components/wallet/WalletDataMenu.vue'
import WalletBalances from '@/components/wallet/WalletBalances.vue'
import WalletActionsMenu from '@/components/wallet/WalletActionsMenu.vue'
import WalletDelegations from '@/components/wallet/WalletDelegations.vue'

@Component({
  name: 'VaultWallet',
  components: {
    WalletDelegations,
    WalletInfo,
    WalletDataMenu,
    WalletActionsMenu,
    WalletBalances,
    WalletTxs
  }
})
export default class VaultWallet extends Mixins(Base, Wallet) {}
</script>
