import Vue from 'vue'
import { AddressBookItem, AddressBook } from '@/model/AddressBook'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'addressBook' })
export default class AddressBookStore extends VuexModule {
  book: AddressBook = {}

  /**
   * Sort items by ABC
   */
  get sorted (): string[] {
    return Object.keys(this.book)
      .sort((a, b) => {
        if (this.book[a].label < this.book[b].label) return -1
        if (this.book[a].label > this.book[b].label) return 1
        return 0
      })
  }

  @Mutation
  commitBook (addressBook: AddressBook) {
    this.book = addressBook
  }

  @Mutation
  commitItemEdit (item: AddressBookItem) {
    Vue.set(this.book, item.address, item)
  }

  @Mutation
  commitItemDelete (address: string) {
    Vue.delete(this.book, address)
  }
}
