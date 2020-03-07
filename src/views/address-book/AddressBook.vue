<template>
  <div class="view address-book">
    <!-- List -->
    <address-book-list v-if="Object.keys(addressBook.sorted).length" />

    <!-- Empty list -->
    <div class="empty" v-else>No contacts yet</div>

    <!-- Modal -->
    <address-book-item-edit />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Mixins } from 'vue-property-decorator'
import AddressBookList from '@/components/address-book/AddressBookList.vue'
import AddressBookItemEdit from '@/components/address-book/modal/AddressBookItemEdit.vue'

@Component({
  name: 'AddressBook.vue',
  components: { AddressBookList, AddressBookItemEdit }
})
export default class Contacts extends Mixins(Base) {}
</script>
