import config from '@/config'
import RootStore from '@/store'
import UIStore from '@/store/ui'
import StateStore from '@/store/state'
import { Config } from '@/model/Config'
import { ERouter } from '@/model/Router'
import SettingsStore from '@/store/settings'
import AddressBookStore from '@/store/addressBook'
import { browser } from 'webextension-polyfill-ts'
import { getModule } from 'vuex-module-decorators'
import { Vue, Component } from 'vue-property-decorator'
import crypto, { CryptoService } from '@/services/Crypto'
import { PostmanService } from '@/services/Postman'
import ws, { MinterWsDataProvider } from '@/providers/MinterWs'

const ui = getModule(UIStore, RootStore)
const state = getModule(StateStore, RootStore)
const settings = getModule(SettingsStore, RootStore)
const addressBook = getModule(AddressBookStore, RootStore)

/**
 * Base mixins, map store & services to Vue
 */

@Component
export default class Base extends Vue {
  get ws (): MinterWsDataProvider {
    return ws
  }

  get ui (): UIStore {
    return ui
  }

  get state (): StateStore {
    return state
  }

  get settings (): SettingsStore {
    return settings
  }

  get addressBook (): AddressBookStore {
    return addressBook
  }

  get crypto (): CryptoService {
    return crypto
  }

  get postman (): PostmanService {
    return new PostmanService()
  }

  get config (): Config {
    return config
  }

  // TODO: implement i18n
  t (key: string): string {
    return browser.i18n.getMessage(key)
  }

  async navigate (path: ERouter, query = {}): Promise<void> {
    if (this.$route.path === path) return

    await this.$router.push({ path, query })
  }
}
