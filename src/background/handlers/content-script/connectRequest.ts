import config from '@/config'
import { Letter } from '@/model/Letter'
import { getQuery } from '@/services/Util'
import { ConnectRequest } from 'minter-connect'
import windows from '@/background/store/windows'
import { browser, Runtime } from 'webextension-polyfill-ts'

// Handle Connect request from content script
export async function handleConnectRequest (message: Letter, sender: Runtime.MessageSender): Promise<void> {
  // Already opened, exit
  if (windows.interact.connect) return

  windows.interact.connect = true

  const tabId = `${sender.tab?.id}`
  const request: ConnectRequest = message.body
  const queryObj = {
    tabId,
    merchantUrl: request.merchant.url,
    merchantName: request.merchant.name
  }

  const query = getQuery(queryObj)
  const url = browser.runtime.getURL(`notification.html#request-connect?${query}`)

  await browser.windows.create({
    url,
    type: 'popup',
    width: config.notification.width,
    height: config.notification.height
  })
}
