<template>
  <div class="cp create-account">
    <p>Choose password with at least 8 symbols:</p>
    <a-form>
      <a-form-item layout="vertical">
        <a-input
          ref="input"
          size="large"
          type="password"
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
          :disabled="invalid"
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
import { ErrorCode } from '@/model/Error'
import Logo from '@/components/common/Logo.vue'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'CreateAccount',
  components: { Logo }
})
export default class CreateAccount extends Mixins(Base, Input) {
  private password = ''
  private passwordRepeat = ''

  get passwordsNotEqual (): boolean {
    return this.password !== this.passwordRepeat
  }

  get passwordsAreShort (): boolean {
    return (
      this.password.length < 8 ||
      this.passwordRepeat.length < 8
    )
  }

  get invalid (): boolean {
    return this.passwordsNotEqual || this.passwordsAreShort
  }

  private async submit (): Promise<void> {
    try {
      if (this.invalid) return

      this.ui.commitLoading(true)

      const expiry = await this.postman.setPassword(this.password)

      this.state.commitExpiry(expiry)
      await this.postman.createVault()
      this.$root.$emit(AppEvent.Login)

      setTimeout(() => {
        this.navigate(ERouter.Vault)
      }, this.config.const.autoRedirectTimeout)
    } catch (e) {
      this.handleError(e)
      this.ui.commitLoading(false)
    } finally {
      this.reset()
    }
  }

  private handleError (e: Error | null = null): void {
    if (this.passwordsAreShort) {
      this.ui.commitError(new Error(ErrorCode.PasswordShort))
      return
    }
    if (this.passwordsNotEqual) {
      this.ui.commitError(new Error(ErrorCode.PasswordMismatch))
      return
    }
    if (e) {
      this.ui.commitError(e)
    }
  }

  private reset (): void {
    this.password = ''
    this.passwordRepeat = ''
  }
}
</script>
