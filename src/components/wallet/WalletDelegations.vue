<template>
  <div class="cp delegations" v-if="visible">
    <div class="head" v-if="delegations.length">
      {{ total | toFixed(0) }} BIP
    </div>

    <!-- Data -->
    <div class="data">
      <!-- Loading Indicator -->
      <loading v-if="loading" />

      <template v-else>
        <!-- Empty List -->
        <data-empty text="No stakes yes" v-if="!delegations.length" />

        <!-- List -->
        <ul class="list" v-else>
          <li v-for="(delegation, key) in delegations" :key="key">
            <span class="pub-key">
              <validator-link :pubKey="delegation.pub_key" :name="delegation.validator_meta.name" />
            </span>
            <span class="value">
              {{ delegation.value | pretty }}
            </span>
            <span class="coin">
              {{ delegation.coin }}
            </span>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import TxHelper from '@/mixins/TxHelper'
import Loading from '@/components/common/Loading.vue'
import TxLink from '@/components/common/tx/TxLink.vue'
import DataEmpty from '@/components/common/DataEmpty.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import ValidatorLink from '@/components/common/validator/ValidatorLink.vue'
import { Delegation, MinterWalletDelegations, UIWalletData } from '@/model/Wallet'

@Component({
  name: 'WalletDelegations',
  components: { DataEmpty, Loading, TxLink, ValidatorLink }
})
export default class WalletDelegations extends Mixins(Base, TxHelper) {
  loading = true
  subscription = 0
  data: MinterWalletDelegations | null = null

  get visible (): boolean {
    return this.ui.walletTab === UIWalletData.Delegations
  }

  get delegations (): Delegation[] {
    if (!this.data) return []

    return this.data.data.sort((a, b) => a.bip_value > b.bip_value ? -1 : 1)
  }

  get total (): number {
    return this.delegations.reduce((prev: number, current: Delegation) => {
      return prev + +current.bip_value
    }, 0)
  }

  @Watch('state.wallet.address', { immediate: true })
  async onWalletAddressChange (address: string) {
    this.loading = true
    this.unsubscribe()
    this.fetch(address)
    this.subscribe(address)
    this.loading = false
  }

  async fetch (address: string) {
    try {
      this.data = await this.postman.getAddressDelegations(address)
    } catch (e) {
      this.ui.commitError(e.message)
    }
  }

  subscribe (address: string) {
    this.subscription = window.setInterval(() => {
      this.fetch(address)
    }, 10000)
  }

  unsubscribe () {
    window.clearInterval(this.subscription)
  }
}
</script>
