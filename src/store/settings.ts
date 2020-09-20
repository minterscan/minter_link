import config from '@/config'
import { Settings } from '@/model/Settings'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'settings' })
export default class SettingsStore extends VuexModule {
  autoLock = config.defaultSettings.autoLock

  @Mutation
  commitSettings (payload: Settings) {
    this.autoLock = payload.autoLock
  }

  @Mutation
  commitAutoLock (value: number) {
    this.autoLock = value
  }
}
