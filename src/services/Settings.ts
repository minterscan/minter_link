import config from '@/config'
import { Settings } from '@/model/Settings'

export class SettingsService {
  private _autoLock = config.defaultSettings.autoLock

  get autoLock (): number {
    return this._autoLock
  }

  setAutoLock (value: number) {
    this._autoLock = value
  }

  getPublicData (): Settings {
    return {
      autoLock: this.autoLock
    }
  }
}

export default new SettingsService()
