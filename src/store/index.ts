import Vue from 'vue'
import Vuex from 'vuex'
import UI from '@/store/ui'
import State from '@/store/state'
import AddressBook from '@/store/addressBook'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    ui: UI,
    state: State,
    addressBook: AddressBook
  }
})
