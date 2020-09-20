<template>
  <div class="view vault">
    <template v-if="state.vault">
      <!-- Empty Vault -->
      <vault-empty v-if="state.empty" />

      <!-- Wallets -->
      <vault-filled v-else />
    </template>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Route } from 'vue-router'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'
import VaultEmpty from '@/components/vault/VaultEmpty.vue'
import VaultFilled from '@/components/vault/VaultFilled.vue'

@Component({
  name: 'Vault',
  components: { VaultEmpty, VaultFilled },
  beforeRouteEnter (to: Route, from: Route, next: Function) {
    next(() => {
      if (from.path === ERouter.Home) {
        document.getElementsByClassName('app')[0].classList.add('loaded')
      }
    })
  }
})
export default class Vault extends Mixins(Base) {}
</script>
