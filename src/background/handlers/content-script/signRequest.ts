import config from '@/config'
import { Letter } from '@/model/Letter'
import { getQuery } from '@/services/Util'
import { SignRequest } from 'minter-connect'
import windows from '@/background/store/windows'
import { browser, Runtime } from 'webextension-polyfill-ts'

// Handle Sign request from content script
export async function handleSignRequest (message: Letter, sender: Runtime.MessageSender): Promise<void> {
  // Already opened, exit
  if (windows.interact.sign) return

  windows.interact.sign = true

  const tabId = `${sender.tab?.id}`
  const request: SignRequest = message.body
  const queryObj = {
    tabId,
    message: request.data.message,
    merchantUrl: request.merchant.url,
    merchantName: request.merchant.name
  }

  const query = getQuery(queryObj)
  const url = browser.runtime.getURL(`notification.html#request-sign?${query}`)

  await browser.windows.create({
    url,
    type: 'popup',
    width: config.notification.width,
    height: config.notification.height
  })
}
