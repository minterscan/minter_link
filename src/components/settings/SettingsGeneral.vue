<template>
  <div class="cp settings-general">
    <a-form layout="vertical">
      <!-- Auto Lock -->
      <a-form-item label="Idle Time Auto Lock ">
        <a-select
          size="large"
          class="form-select"
          :value="autoLock"
          @change="onAutoLockChange"
        >
          <a-select-option
            :key="key"
            :value="item.value"
            v-for="(item, key) in autoLockValues"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <!-- Delete Vault -->
      <a-form-item label="Clear Data">
        <a-button type="danger" @click="onDelete()">
          Delete All
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class SettingsGeneral extends Mixins(Base) {
  autoLockValues = [
    {
      value: 5 * 60 * 1000,
      label: '5 minutes'
    },
    {
      value: 15 * 60 * 1000,
      label: '15 minutes'
    },
    {
      value: 30 * 60 * 1000,
      label: '30 minutes'
    },
    {
      value: 60 * 60 * 1000,
      label: '60 minutes'
    }
  ]

  get autoLock (): number {
    return this.settings.autoLock
  }

  mounted (): void {
    this.$root.$on(AppEvent.VaultUnlocked, async () => {
      await this.postman.vaultDelete()
      await this.postman.deletePassword()

      this.state.commitLoggedIn(false)
      this.state.commitVaultExist(false)
    })
  }

  async onAutoLockChange (value: number): Promise<void> {
    await this.postman.setSettingsAutoLock(value)

    this.settings.commitAutoLock(value)
  }

  onDelete (): void {
    this.$root.$emit(AppEvent.VaultDeleteUnlock)
  }
}
</script>
