<template>
  <div class="cp address-book-title" v-if="visible">
    Contacts
    <a-button type="primary" shape="round" icon="plus" @click="addItem()" />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class AddressBookTitle extends Mixins(Base) {
  get visible (): boolean {
    return this.$route.path === ERouter.AddressBook
  }

  addItem () {
    this.$root.$emit(AppEvent.AddressBookItemOpen)
  }
}
</script>
