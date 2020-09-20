<template>
  <a-modal
    centered
    class="cp action-convert"
    :title="contact ? 'Edit Contact' : 'New Contact'"
    :visible="visible"
    okText="Submit"
    cancelText="Close"
    @ok="submit()"
    :confirmLoading="loading"
    :okButtonProps="{ props: { disabled: !valid || loading } }"
    :cancelButtonProps="{ props: { disabled: loading } }"
    @cancel="close()"
  >
    <div class="cp contact-edit">
      <div class="head">
        <h2 class="ant-typography"></h2>
      </div>

      <div class="data">
        <!-- Loading Indicator -->
        <loading v-show="loading" />

        <!-- Form -->
        <a-form>
          <!-- Label -->
          <a-form-item label="Label">
            <a-input
              ref="input"
              size="large"
              v-model="label"
              placeholder="Name"
              @keyup.enter="submit()"
            >
              <a-icon slot="prefix" type="flag" />
            </a-input>
          </a-form-item>
          <!-- Address -->
          <a-form-item label="Address">
            <address-link :address="contact.address" v-if="contact" />
            <a-input
              v-else
              size="large"
              v-model="address"
              placeholder="Mx..."
              @keyup.enter="submit()"
            >
              <a-icon slot="prefix" type="deployment-unit" />
            </a-input>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { isValidAddress } from 'minterjs-util'
import { AddressBookItem } from '@/model/AddressBook'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import AddressLink from '@/components/common/address/AddressLink.vue'

@Component({
  name: 'AddressBookItemEdit',
  components: { AddressLink, Loading }
})
export default class AddressBookItemEdit extends Mixins(Base) {
  label = ''
  address = ''
  loading = false
  visible = false

  @Prop({ default: null }) contact!: AddressBookItem

  get valid (): boolean {
    return this.label && isValidAddress(this.address)
  }

  mounted (): void {
    this.$root.$on(AppEvent.AddressBookItemOpen, (item: AddressBookItem | null = null) => {
      this.visible = true

      if (item) {
        this.label = item.label
        this.address = item.address
      }
    })
  }

  async submit (): Promise<void> {
    if (!this.valid) return

    this.loading = true

    const item = await this.postman.addressBookItemAdd({
      label: this.label,
      address: this.address
    })

    setTimeout(() => {
      this.close()
      this.addressBook.commitItemEdit(item)
    }, this.config.const.autoRedirectTimeout)
  }

  reset (): void {
    this.label = ''
    this.address = ''
    this.loading = false
    this.visible = false
  }

  close (): void {
    this.reset()
  }
}
</script>
