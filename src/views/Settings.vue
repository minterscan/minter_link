<template>
  <div class="view settings">
    <!-- Header -->
    <view-header title="Settings" />

    <!-- Menu -->
    <a-radio-group v-model="tab" button-style="solid">
      <a-radio-button
        :key="key"
        :value="key"
        v-for="(item, key) in buttons"
      >
        <a-icon :type="item.icon" />
        {{ item.label }}
      </a-radio-button>
    </a-radio-group>

    <!-- Content -->
    <div class="view-content">
      <!-- General -->
      <settings-general v-if="isGeneral" />

      <!-- Connections -->
      <settings-wallets v-if="isWallets" />
    </div>

    <!-- Modals -->
    <export-seed-unlock />
    <delete-vault-unlock />
    <delete-wallet-unlock />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Mixins } from 'vue-property-decorator'
import ViewHeader from '@/components/common/ViewHeader.vue'
import { UISettingsData, UISettingsButtons } from '@/model/Settings'
import SettingsGeneral from '@/components/settings/SettingsGeneral.vue'
import SettingsWallets from '@/components/settings/SettingsWallets.vue'
import ExportSeedUnlock from '@/components/settings/ExportSeedUnlock.vue'
import DeleteVaultUnlock from '@/components/settings/DeleteVaultUnlock.vue'
import DeleteWalletUnlock from '@/components/settings/DeleteWalletUnlock.vue'

@Component({
  name: 'Settings',
  components: {
    SettingsGeneral,
    SettingsWallets,
    ExportSeedUnlock,
    DeleteVaultUnlock,
    DeleteWalletUnlock,
    ViewHeader
  }
})
export default class About extends Mixins(Base) {
  tab = UISettingsData.General
  buttons: UISettingsButtons = {
    [UISettingsData.General]: {
      icon: 'setting',
      label: 'General'
    },
    [UISettingsData.Wallets]: {
      icon: 'api',
      label: 'Wallets'
    }
  }

  get isGeneral (): boolean {
    return this.tab === UISettingsData.General
  }

  get isWallets (): boolean {
    return this.tab === UISettingsData.Wallets
  }
}
</script>
