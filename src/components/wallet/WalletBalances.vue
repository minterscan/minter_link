<template>
  <div class="cp wallet-balances" v-if="visible">
    <div class="head" v-if="!empty"></div>

    <!-- Data -->
    <div class="data">
      <!-- Loading Indicator -->
      <loading v-if="loading" />

      <template v-else>
        <!-- Empty List -->
        <data-empty text="Empty balance" v-if="empty" />

        <!-- List -->
        <ul class="list" v-else>
          <li v-for="(balance, key) in balances" :key="key">
          <span class="coin">
            {{ balance.coin }}
          </span>
            <span class="amount">
            {{ balance.amount | pretty }}
          </span>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Loading from '@/components/common/Loading.vue'
import DataEmpty from '@/components/common/DataEmpty.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { ECoin, MinterWalletBalance, UIWalletData } from '@/model/Wallet'

@Component({
  name: 'WalletBalances',
  components: { DataEmpty, Loading }
})
export default class WalletBalances extends Mixins(Base) {
  loading = true
  balances: MinterWalletBalance[] = []

  get visible (): boolean {
    return this.ui.walletTab === UIWalletData.Balances
  }

  get empty (): boolean {
    return this.balances.length === 1 && this.balances[0].coin === ECoin.BIP && !+this.balances[0].amount
  }

  @Watch('state.wallet.balances', { immediate: true })
  onBalancesChange (balances: MinterWalletBalance[]) {
    if (balances) {
      this.balances = balances.slice().sort((a, b) => a.coin < b.coin ? -1 : 1)
    }

    this.loading = false
  }
}
</script>
