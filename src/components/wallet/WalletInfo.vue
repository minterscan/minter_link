<template>
  <div class="cp wallet-info">
    <div class="info">
      <div class="balance">
        <div class="bip">{{ bip | pretty }} BIP</div>
        <div class="usd">${{ usd | toFixed }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Big from 'bignumber.js'
import Base from '@/mixins/Base'
import Icon from 'vue-awesome/components/Icon.vue'
import { MinterWalletBalance } from '@/model/Wallet'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component({
  name: 'WalletInfo',
  components: { Icon }
})
export default class WalletInfo extends Mixins(Base) {
  bip = '0'
  usd = '0'

  @Watch('bip')
  @Watch('network.status')
  onBipChange () {
    this.usd = new Big(this.bip).multipliedBy(this.network.status.bip_price_usd ?? 1).toString()
  }

  @Watch('state.wallet.balances', { deep: true })
  onWalletChange (balances: MinterWalletBalance[]): void {
    if (!balances) return

    const balance = balances.find(item => !item.coin.id)

    this.bip = balance ? balance.amount : '0'
  }
}
</script>
