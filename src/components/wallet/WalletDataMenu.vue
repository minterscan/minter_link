<template>
  <a-radio-group v-model="tab" class="cp wallet-data-menu">
    <a-radio-button
      :key="key"
      :value="key"
      v-for="(item, key) in buttons"
    >
      <a-icon :type="item.icon" />
      {{ item.label }}
    </a-radio-button>
  </a-radio-group>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Watch } from 'vue-property-decorator'
import { UIWalletButtons, UIWalletData } from '@/model/Wallet'

@Component({
  name: 'WalletDataMenu'
})
export default class WalletDataMenu extends Base {
  tab: UIWalletData = UIWalletData.Transactions
  buttons: UIWalletButtons = {
    [UIWalletData.Transactions]: {
      icon: 'thunderbolt',
      label: 'History'
    },
    [UIWalletData.Balances]: {
      icon: 'wallet',
      label: 'Coins'
    },
    [UIWalletData.Delegations]: {
      icon: 'lock',
      label: 'Stakes'
    }
  }

  @Watch('tab')
  onTabChange (tab: UIWalletData): void {
    this.ui.commitWalletTab(tab)
  }

  @Watch('state.wallet.address', { immediate: true })
  onWalletAddressChange (): void {
    this.tab = UIWalletData.Transactions
  }

  destroyed (): void {
    this.ui.commitWalletTab(UIWalletData.Transactions)
  }
}
</script>
