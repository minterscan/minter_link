<template>
  <div class="cp address-book-list">
    <address-book-item
      :key="key"
      :item="item"
      v-for="(item, key) in addressBook.sorted" />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Mixins } from 'vue-property-decorator'
import AddressBookItem from '@/components/address-book/AddressBookItem.vue'

@Component({
  name: 'ContactsList',
  components: { AddressBookItem }
})
export default class AddressBookList extends Mixins(Base) {}
</script>
