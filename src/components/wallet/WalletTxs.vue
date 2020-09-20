<template>
  <div class="cp wallet-txs" v-if="visible">
    <div class="head" v-if="!empty">
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
        <data-empty text="No transactions yet" v-if="empty" />

        <!-- List -->
        <ul class="list" v-else>
          <li v-for="(tx, key) in txs.data" :key="key">
            <div class="hash-from-payload">
              <div class="hash-from">
                <div class="hash">
                  <tx-link :hash="tx.hash" :short="true" />
                </div>
                <div class="from">
                  <address-link :address="tx.from" :short="true" v-if="tx.from !== state.wallet.address" />
                  <span class="me" v-else>Me</span>

                  <!-- Delegate / Unbond -->
                  <template v-if="tx.data.pub_key">
                    →
                    <validator-link :pubKey="tx.data.pub_key" />
                  </template>

                  <!-- Send / Multisend -->
                  <template v-if="tx.data.to">
                    →
                    <address-link :address="tx.data.to" :short="true" v-if="tx.data.to !== state.wallet.address" />
                    <span class="me" v-else>Me</span>
                  </template>

                  <template v-if="!tx.data.to && !tx.data.pub_key">
                    → Blockchain
                  </template>
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
import ValidatorLink from '@/components/common/validator/ValidatorLink.vue'

// Ignore snake case for Minter Explorer API data
/* eslint-disable @typescript-eslint/camelcase */

const TXS_PER_PAGE = 10

@Component({
  name: 'WalletTxs',
  components: { AddressLink, BlockLink, DataEmpty, Loading, TxLink, TxPayload, ValidatorLink }
})
export default class WalletTxs extends Mixins(Base, TxHelper) {
  empty = true
  loading = true
  txs: MinterWalletTxs | null = null

  get visible (): boolean {
    return this.ui.walletTab === UIWalletData.Transactions
  }

  @Watch('txs', { deep: true })
  onTxsDataLengthChange (txs: MinterWalletTxs): void {
    this.empty = true
    if (txs.data.length) this.empty = false
  }

  @Watch('state.wallet.address', { immediate: true })
  async onWalletAddressChange (address: string): Promise<void> {
    this.ui.commitLoading(true)
    this.unsubscribe()
    this.fetch(address)
    this.subscribe()
    this.$nextTick(() => { this.ui.commitLoading(false) })
  }

  destroyed (): void {
    if (this.state.wallet) this.unsubscribe()
  }

  async fetch (address: string, page = 1, limit = TXS_PER_PAGE): Promise<void> {
    try {
      this.loading = true
      this.$set(this, 'txs', await this.postman.getAddressTxs({ address, page, limit }))
      this.loading = false
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  onPageChange (page: number): void {
    if (!this.state.wallet) { return }

    this.fetch(this.state.wallet.address, page)
  }

  subscribe (): void {
    this.ws.subscribeToTxs(this.onTx)
  }

  unsubscribe (): void {
    this.ws.unsubscribeFromTxs()
  }

  onTx (tx: Tx): void {
    if (!this.txs) return
    if (!this.state.wallet) return

    if (tx.from === this.state.wallet.address || tx.data.to === this.state.wallet.address) {
      this.txs.data.unshift(tx)
      this.txs.data.splice(TXS_PER_PAGE, 1)
      this.txs.meta.total++

      if (!this.txs.meta.current_page) this.txs.meta.current_page = 1
    }
  }
}
</script>
