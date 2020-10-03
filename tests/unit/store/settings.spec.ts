import config from '@/config'
import RootStore from '@/store'
import SettingsStore from '@/store/settings'
import { getModule } from 'vuex-module-decorators'

let settings: SettingsStore

beforeEach(() => {
  settings = getModule(SettingsStore, RootStore)
})

it('get autolock', () => {
  expect(settings.autoLock).toEqual(config.defaultSettings.autoLock)
})

it('set settings', () => {
  settings.commitSettings({
    autoLock: 1
  })

  expect(settings.autoLock).toEqual(1)
})

it('commit autolock', () => {
  settings.commitAutoLock(2)

  expect(settings.autoLock).toEqual(2)
})
