<template>
  <div class="cp wallet-txs" v-if="visible">
    <div class="head" v-if="txs && txs.meta.total">
      <a-pagination
        simple
        @change="onPageChange"
        :pageSize="txs.meta.per_page"
        :total="txs.meta.total"
      />
    </div>

    <!-- Data -->
    <div class="data">
      <!-- Loading Indicator -->
      <loading v-if="loading" />

      <template v-else>
        <!-- Empty List -->
        <data-empty text="No transactions yet" v-if="txs && !txs.data.length" />

        <!-- List -->
        <ul class="list" v-if="txs && txs.data.length">
          <li v-for="(tx, key) in txs.data" :key="key">
            <div class="hash-from-payload">
              <div class="hash-from">
                <div>
                  Hash: <tx-link :hash="tx.hash" :short="true" />
                </div>
                <div>
                  From:
                  <address-link :address="tx.from" :short="true" v-if="tx.from !== state.wallet.address" />
                  <template v-else>Me</template>
                </div>
              </div>
              <tx-payload :payload="tx.payload" v-if="tx.payload" />
            </div>
            <span class="type-amount">
              <span class="type">{{ tx.type | txType }}</span>
              <span v-if="hasAmount(tx)" class="amount">{{ getAmountWithCoin(tx) }}</span>
            </span>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Tx } from '@/model/Tx'
import Base from '@/mixins/Base'
import TxHelper from '@/mixins/TxHelper'
import Loading from '@/components/common/Loading.vue'
import TxLink from '@/components/common/tx/TxLink.vue'
import DataEmpty from '@/components/common/DataEmpty.vue'
import TxPayload from '@/components/common/tx/TxPayload.vue'
import { MinterWalletTxs, UIWalletData } from '@/model/Wallet'
import BlockLink from '@/components/common/block/BlockLink.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import AddressLink from '@/components/common/address/AddressLink.vue'

const TXS_PER_PAGE = 10

@Component({
  name: 'WalletTxs',
  components: { AddressLink, BlockLink, DataEmpty, Loading, TxLink, TxPayload }
})
export default class WalletTxs extends Mixins(Base, TxHelper) {
  txs: MinterWalletTxs | null = null
  loading = true

  get visible (): boolean {
    return this.ui.walletTab === UIWalletData.Transactions
  }

  @Watch('state.wallet.address', { immediate: true })
  async onWalletAddressChange (address: string) {
    this.ui.commitLoading(true)
    this.subscribe()
    this.fetch(address)
    this.$nextTick(() => { this.ui.commitLoading(false) })
  }

  destroyed (): void {
    this.unsubscribe()
  }

  async fetch (address: string, page = 1, limit = TXS_PER_PAGE) {
    try {
      this.loading = true
      this.txs = await this.postman.getAddressTxs({ address, page, limit })
      this.loading = false
    } catch (e) {
      this.ui.commitError(e.message)
    }
  }

  onPageChange (page: number) {
    if (!this.state.wallet) { return }

    this.fetch(this.state.wallet.address, page)
  }

  subscribe () {
    this.ws.subscribeToTxs(this.onTx)
  }

  unsubscribe () {
    this.ws.unsubscribeFromTxs()
  }

  onTx (tx: Tx) {
    if (!this.txs) return
    if (!this.state.wallet) return

    if (tx.from === this.state.wallet.address || tx.data.to === this.state.wallet.address) {
      this.txs.data.unshift(tx)
      this.txs.data.splice(TXS_PER_PAGE, 1)
    }
  }
}
</script>
