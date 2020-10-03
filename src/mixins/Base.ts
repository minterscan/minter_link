import config from '@/config'
import RootStore from '@/store'
import UIStore from '@/store/ui'
import Centrifuge from 'centrifuge'
import StateStore from '@/store/state'
import { Config } from '@/model/Config'
import { ERouter } from '@/model/Router'
import NetworkStore from '@/store/network'
import SettingsStore from '@/store/settings'
import AddressBookStore from '@/store/addressBook'
import { browser } from 'webextension-polyfill-ts'
import { getModule } from 'vuex-module-decorators'
import { PostmanService } from '@/services/Postman'
import { Vue, Component } from 'vue-property-decorator'
import crypto, { CryptoService } from '@/services/Crypto'
import MinterWsProvider from '@/providers/MinterWsProvider'

const ui = getModule(UIStore, RootStore)
const state = getModule(StateStore, RootStore)
const network = getModule(NetworkStore, RootStore)
const settings = getModule(SettingsStore, RootStore)
const addressBook = getModule(AddressBookStore, RootStore)

/**
 * Base mixins, map store & services to Vue
 */

@Component
export default class Base extends Vue {
  get ws (): MinterWsProvider {
    const centrifuge = new Centrifuge(config.explorerWsUrl, { debug: true })
    const ws = new MinterWsProvider(centrifuge)

    ws.connect()

    return ws
  }

  get ui (): UIStore {
    return ui
  }

  get state (): StateStore {
    return state
  }

  get network (): NetworkStore {
    return network
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
