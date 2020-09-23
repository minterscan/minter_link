import { Letter } from '@/model/Letter'
import WindowService from '@/services/Window'
import { SignRequest } from 'minter-connect'
import windows from '@/background/store/windows'
import { Runtime } from 'webextension-polyfill-ts'
import { WindowQueryObject, WindowType } from '@/model/Window'

// Handle Sign request from content script
export async function handleSignRequest (message: Letter, sender: Runtime.MessageSender): Promise<void> {
  // Already opened, exit
  if (windows.interact.sign) return

  const tabId = `${sender.tab?.id}`
  const request: SignRequest = message.body
  const queryObj: WindowQueryObject = {
    tabId,
    message: request.data.message,
    merchantUrl: request.merchant.url,
    merchantName: request.merchant.name
  }

  WindowService.open(WindowType.Sign, queryObj)
}
