<template>
  <div class="cp wallet-info">
    <div class="info">
      <div class="head">
        <address-link :address="state.wallet.address" />
      </div>
      <div class="balance">
        <div class="bip">{{ bip | pretty }} BIP</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Icon from 'vue-awesome/components/Icon.vue'
import { ECoin, MinterWalletBalance } from '@/model/Wallet'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import AddressLink from '@/components/common/address/AddressLink.vue'

@Component({
  name: 'WalletInfo',
  components: { AddressLink, Icon }
})
export default class WalletInfo extends Mixins(Base) {
  bip = '0'

  @Watch('state.wallet.balances', { deep: true })
  onWalletChange (balances: MinterWalletBalance[]): void {
    if (!balances) return

    const balance = balances.find(item => item.coin === ECoin.BIP)

    this.bip = balance ? balance.amount : '0'
  }
}
</script>
