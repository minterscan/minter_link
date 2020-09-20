import config from '@/config'
import { Letter } from '@/model/Letter'
import { getQuery } from '@/services/Util'
import { PaymentRequest } from 'minter-connect'
import windows from '@/background/store/windows'
import { browser, Runtime } from 'webextension-polyfill-ts'

// Handle Payment request from content script
export async function handlePaymentRequest (message: Letter, sender: Runtime.MessageSender): Promise<void> {
  // Already opened, exit
  if (windows.interact.payment) return

  windows.interact.payment = true

  const tabId = `${sender.tab?.id}`
  const request: PaymentRequest = message.body
  const queryObj = {
    tabId,
    coin: request.data.coin,
    amount: request.data.amount,
    address: request.data.address,
    payload: request.data.payload,
    merchantUrl: request.merchant.url,
    merchantName: request.merchant.name
  }
  const query = getQuery(queryObj)
  const url = browser.runtime.getURL(`notification.html?#request-payment?${query}`)

  await browser.windows.create({
    url,
    type: 'popup',
    width: config.notification.width,
    height: config.notification.height
  })
}
