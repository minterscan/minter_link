<template>
  <div class="cp address-book-item">
    <div class="name-address">
      <div class="label">{{ item.label }}</div>
      <div class="address">
        <address-link :address="item.address" />
      </div>
    </div>
    <div class="menu">
      <clipboard-button :text="item.address" shape="circle">
        <a-icon type="copy" slot="content" />
      </clipboard-button>
      <a-button shape="circle" icon="setting" @click="editContact()" />
      <a-button shape="circle" icon="close" @click="deleteContact()" />
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { AddressBookItem } from '@/model/AddressBook'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import AddressLink from '@/components/common/address/AddressLink.vue'
import ClipboardButton from '@/components/common/ClipboardButton.vue'

@Component({
  components: { AddressLink, ClipboardButton }
})
export default class Item extends Mixins(Base) {
  @Prop({ default: {} }) item!: AddressBookItem

  editContact (): void {
    this.$root.$emit(AppEvent.AddressBookItemOpen, this.item)
  }

  deleteContact (): void {
    this.$confirm({
      parentContext: this,
      title: 'Are you sure want to delete this contact?',
      content: 'It can not be undone!',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          if (!this.state.vault) { return }

          await this.postman.addressBookItemDelete(this.item.address)
          this.addressBook.commitItemDelete(this.item.address)
        } catch (e) {
          this.ui.commitError(e.message)
        }
      }
    })
  }
}
</script>
