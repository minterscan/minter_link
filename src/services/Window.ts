import config from '@/config'
import { getQuery } from '@/services/Util'
import windows from '@/background/store/windows'
import { browser, Windows } from 'webextension-polyfill-ts'
import { WindowType, WindowQueryObject } from '@/model/Window'

// Notification Window
export class Window {
  window!: Windows.Window

  async open (url: string) {
    const type = 'popup'
    const width = config.notification.width
    const height = config.notification.height
    const left = (screen.width / 2) - (width / 2)
    const top = (screen.height / 2) - (height / 2)

    this.window = await browser.windows.create({
      url,
      type,
      top,
      left,
      width,
      height
    })
  }

  close () {
    if (this.id) browser.tabs.remove(this.id)
  }

  get id (): number {
    return this.window?.tabs?.[0]?.id ?? 0
  }
}

export default class WindowService {
  static open (type: WindowType, queryObj: WindowQueryObject) {
    const query = getQuery(queryObj as Record<string, string>)
    const url = browser.runtime.getURL(`notification.html#request-${type}?${query}`)
    const window = new Window()

    window.open(url)
    windows.interact[type] = window
  }

  // Try to close all open notification windows
  static closeAll () {
    if (windows.interact.sign) windows.interact.sign.close()
    if (windows.interact.connect) windows.interact.connect.close()
    if (windows.interact.payment) windows.interact.payment.close()
  }
}
