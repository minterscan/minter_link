<template>
  <div class="view home" :class="loggedIn ? 'logged-in' : ''">
    <template>
      <!-- Logo -->
      <logo />
      <!-- Login -->
      <login v-if="state.vaultExist" />

      <!-- Create Vault -->
      <create-vault v-else />

      <!-- Import Account Link -->
      <a-button type="link" icon="download" @click="openImport()" class="import">Import account</a-button>
    </template>

    <icon name="wave" class="wave" scale="50" />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { ERouter } from '@/model/Router'
import Logo from '@/components/common/Logo.vue'
import Login from '@/components/auth/Login.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Mixins } from 'vue-property-decorator'
import CreateVault from '@/components/auth/CreateAccount.vue'

@Component({
  name: 'Home',
  components: { Icon, Logo, Login, CreateVault }
})
export default class Home extends Mixins(Base) {
  loggedIn = false

  openImport (): void {
    this.navigate(ERouter.AccountImport)
  }

  mounted (): void {
    this.$root.$on(AppEvent.Login, () => {
      this.loggedIn = true
    })
  }

  destroyed (): void {
    this.$root.$off(AppEvent.Login)
  }
}
</script>
