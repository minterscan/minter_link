<template>
  <div class="cp create-account">
    <p>Choose password with at least 8 symbols:</p>
    <a-form>
      <a-form-item layout="vertical">
        <a-input
          ref="input"
          size="large"
          type="password"
          @keyup.enter="submit()"
          v-model="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item layout="vertical">
        <a-input
          size="large"
          type="password"
          @keyup.enter="submit()"
          v-model="passwordRepeat"
          placeholder="Repeat Password"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          block
          ghost
          type="action"
          size="large"
          icon="login"
          @click="submit()">
          Enter
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Input from '@/mixins/Input'
import { AppEvent } from '@/model/App'
import { ERouter } from '@/model/Router'
import Logo from '@/components/common/Logo.vue'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'CreateAccount',
  components: { Logo }
})
export default class CreateAccount extends Mixins(Base, Input) {
  private password = ''
  private passwordRepeat = ''

  private async submit (): Promise<void> {
    try {
      const expiry = await this.postman.setPassword({
        password: this.password,
        passwordRepeat: this.passwordRepeat
      })

      this.state.commitExpiry(expiry)
      await this.postman.createVault()
      this.$root.$emit(AppEvent.Login)

      setTimeout(() => {
        this.navigate(ERouter.Vault)
      }, this.config.const.autoRedirectTimeout)
    } catch (e) {
      this.ui.commitError(e)
    } finally {
      this.reset()
    }
  }

  private reset (): void {
    this.password = ''
    this.passwordRepeat = ''
  }
}
</script>
