<template>
  <a-form>
    <a-form-item label="" layout="vertical">
      <a-input
        ref="input"
        size="large"
        type="password"
        v-model="password"
        placeholder="Password"
        @keyup.enter="submit()"
      >
        <a-icon slot="prefix" type="lock" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button ghost type="action" size="large" block @click="submit()">
        Unlock
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Input from '@/mixins/Input'
import { AppEvent } from '@/model/App'
import { ERouter } from '@/model/Router'
import Logo from '@/components/common/Logo.vue'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'Login',
  components: { Logo }
})
export default class Login extends Mixins(Base, Input) {
  protected password = ''

  protected async submit (): Promise<void> {
    try {
      await this.postman.vaultPing(this.password)
      await this.postman.setPassword(this.password)

      this.$root.$emit(AppEvent.Login)

      setTimeout(() => {
        this.navigate(ERouter.Vault)
      }, this.config.const.autoRedirectTimeout)
    } catch (e) {
      this.ui.commitError(e)
    } finally {
      this.password = ''
    }
  }

  protected reset (): void {
    this.ui.commitError(null)
    this.password = ''
  }

  protected destroyed (): void {
    this.reset()
  }
}
</script>
