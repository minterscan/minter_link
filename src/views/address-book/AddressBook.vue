<template>
  <div class="view address-book">
    <!-- Headet -->
    <view-header title="Contacts">
      <template slot="extra">
        <a-button type="dashed" key="1" shape="circle" icon="plus" @click="addItem()" />
      </template>
    </view-header>

    <!-- Content -->
    <div class="view-content" v-if="addressBook.sorted.length">
      <address-book-item
        :key="index"
        :item="addressBook.book[address]"
        v-for="(address, index) in addressBook.sorted" />
    </div>

    <!-- Empty list -->
    <div class="empty" v-else>No contacts yet</div>

    <!-- Modal -->
    <address-book-item-edit />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { Component, Mixins } from 'vue-property-decorator'
import ViewHeader from '@/components/common/ViewHeader.vue'
import AddressBookItem from '@/components/address-book/AddressBookItem.vue'
import AddressBookItemEdit from '@/components/address-book/modal/AddressBookItemEdit.vue'

@Component({
  name: 'AddressBook',
  components: { AddressBookItem, AddressBookItemEdit, ViewHeader }
})
export default class AddressBook extends Mixins(Base) {
  addItem () {
    this.$root.$emit(AppEvent.AddressBookItemOpen)
  }
}
</script>
