import UI from '@/store/ui'
import RootStore from '@/store'
import State from '@/store/state'
import { ERouter } from '@/model/Router'
import AddressBook from '@/store/addressBook'
import { browser } from 'webextension-polyfill-ts'
import { getModule } from 'vuex-module-decorators'
import { Vue, Component } from 'vue-property-decorator'
import crypto, { CryptoService } from '@/services/Crypto'
import postman, { PostmanService } from '@/services/Postman'
import ws, { MinterWsDataProvider } from '@/providers/MinterWs'

const ui = getModule(UI, RootStore)
const state = getModule(State, RootStore)
const addressBook = getModule(AddressBook, RootStore)

/**
 * Base mixins, map store & services to Vue
 */

@Component
export default class Base extends Vue {
  get ws (): MinterWsDataProvider {
    return ws
  }

  get ui (): UI {
    return ui
  }

  get state (): State {
    return state
  }

  get addressBook (): AddressBook {
    return addressBook
  }

  get crypto (): CryptoService {
    return crypto
  }

  get postman (): PostmanService {
    return postman
  }

  t (key: string): string {
    return browser.i18n.getMessage(key)
  }

  async navigate (path: ERouter, query = {}): Promise<void> {
    if (this.$route.path === path) return

    await this.$router.push({ path, query })
  }
}
