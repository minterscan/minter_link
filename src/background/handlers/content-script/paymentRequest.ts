import { Letter } from '@/model/Letter'
import { getQuery } from '@/services/Util'
import { PaymentRequest } from 'minter-connect'
import { browser, Runtime } from 'webextension-polyfill-ts'

// Handle Payment request from content script
export async function handlePaymentRequest (message: Letter, sender: Runtime.MessageSender): Promise<void> {
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
  const url = browser.runtime.getURL(`notification.html#notification?${query}`)

  await browser.windows.create({
    url,
    type: 'popup',
    width: 500,
    height: 600
  })
}
