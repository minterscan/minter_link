import { Letter } from '@/model/Letter'
import WindowService from '@/services/Window'
import { PaymentRequest } from 'minter-connect'
import windows from '@/background/store/windows'
import { Runtime } from 'webextension-polyfill-ts'
import { WindowQueryObject, WindowType } from '@/model/Window'

// Handle Payment request from content script
export async function handlePaymentRequest (message: Letter, sender: Runtime.MessageSender): Promise<void> {
  // Already opened, exit
  if (windows.interact.payment) return

  const tabId = `${sender.tab?.id}`
  const request: PaymentRequest = message.body
  const queryObj: WindowQueryObject = {
    tabId,
    coin: request.data.coin,
    amount: request.data.amount,
    address: request.data.address,
    payload: request.data.payload,
    merchantUrl: request.merchant.url,
    merchantName: request.merchant.name
  }

  WindowService.open(WindowType.Payment, queryObj)
}
