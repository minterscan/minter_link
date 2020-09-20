<template>
  <div class="view vault-import">
    <h2 class="ant-typography">Import account</h2>
    <p>Paste your encoded account string below:</p>
    <a-form>
      <!-- Input -->
      <a-form-item label="" layout="vertical">
        <a-textarea
          v-model="encodedString"
          placeholder="Encoded account string"
          :autoSize="{ minRows: 3, maxRows: 6 }"
        />
      </a-form-item>

      <!-- Alert -->
      <a-form-item>
        <a-alert
          type="error"
          message="After import all past data, including wallets and contacts will be lost!"
        />
      </a-form-item>

      <!-- Submit -->
      <a-form-item>
        <a-button type="primary" @click="submit()" :disabled="!encodedString">
          I understand, import
        </a-button>
        <a-button @click="close()">
          Back
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class VaultImport extends Mixins(Base) {
  encodedString = ''

  submit (): void {
    this.ui.commitLoading(true)

    setTimeout(async () => {
      try {
        await this.postman.createVault(this.encodedString)
        this.ui.commitLoading(false)
        this.navigate(ERouter.Home)
      } catch (e) {
        this.ui.commitError(e)
      } finally {
        this.reset()
      }
    }, this.config.const.autoRedirectTimeout)
  }

  close (): void {
    this.navigate(ERouter.Home)
  }

  reset (): void {
    this.encodedString = ''
  }

  destroyed (): void {
    this.reset()
  }
}
</script>
