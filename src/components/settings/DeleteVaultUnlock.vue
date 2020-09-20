<template >
  <a-modal
    centered
    :keyboard="true"
    okText="Save changes"
    cancelText="Close"
    @cancel="close()"
    :maskClosable="true"
    :visible="visible"
    :confirmLoading="loading"
    title="Unlock vault"
    wrapClassName="cp vault-unlock"
  >
    <!-- Loading Indicator -->
    <loading v-show="loading" />

    <!-- Form -->
    <a-form>
      <a-form-item label="Type your password">
        <a-input
          ref="input"
          size="large"
          type="password"
          v-model.trim="password"
          placeholder="Password"
          @keyup.enter="submit()"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
    </a-form>

    <!-- Buttons -->
    <template slot="footer">
      <div v-if="error">{{ error }}</div>
      <div>
        <a-button key="back" @click="close()">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :disabled="password === ''" :loading="loading" @click="submit()">
          Unlock
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Input from '@/mixins/Input'
import { AppEvent } from '@/model/App'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component({
  name: 'DeleteVaultUnlock',
  components: { Loading }
})
export default class DeleteVaultUnlock extends Mixins(Base, Input) {
  error = ''
  visible = false
  loading = false
  password = ''

  @Watch('visible')
  onVisibleChange (value: boolean): void {
    if (value) this.$nextTick(this.focus)
  }

  mounted (): void {
    this.$root.$on(AppEvent.VaultDeleteUnlock, () => {
      this.visible = true
      this.loading = false
    })
  }

  async submit (): Promise<void> {
    // Empty password, exit
    if (this.password === '') return

    try {
      this.loading = true

      const seed = await this.postman.vaultPing(this.password)

      setTimeout(() => {
        this.close()
        this.$root.$emit(AppEvent.VaultUnlocked, seed)
      }, this.config.const.autoRedirectTimeout)
    } catch (e) {
      this.password = ''
      this.loading = false
      this.ui.commitError(e)
    }
  }

  close (): void {
    this.password = ''
    this.visible = false
  }
}
</script>
