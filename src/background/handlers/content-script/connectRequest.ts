import { Letter } from '@/model/Letter'
import WindowService from '@/services/Window'
import { ConnectRequest } from 'minter-connect'
import windows from '@/background/store/windows'
import { Runtime } from 'webextension-polyfill-ts'
import { WindowQueryObject, WindowType } from '@/model/Window'

// Handle Connect request from content script
export async function handleConnectRequest (message: Letter, sender: Runtime.MessageSender): Promise<void> {
  // Already opened, exit
  if (windows.interact.connect) return

  const tabId = `${sender.tab?.id}`
  const request: ConnectRequest = message.body
  const queryObj: WindowQueryObject = {
    tabId,
    merchantUrl: request.merchant.url,
    merchantName: request.merchant.name
  }

  WindowService.open(WindowType.Connect, queryObj)
}
