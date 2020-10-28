import './subscribers'
import { EPort } from '@/model/Port'
import windows from '@/background/store/windows'
import { browser, Runtime } from 'webextension-polyfill-ts'
import { handlers, contentScriptHandlers } from '@/background/handlers'
import { Letter, LetterSubject, ContentScriptLetterSubject } from '@/model/Letter'

function onPortDisconnect (port: Runtime.Port, id: number) {
  // Delete dead ports
  delete windows.ports[id]

  // On notification ports close
  if (port.name === EPort.Sign) windows.interact.sign = null
  if (port.name === EPort.Connect) windows.interact.connect = null
  if (port.name === EPort.Payment) windows.interact.payment = null
}

// Port listener
browser.runtime.onConnect.addListener(port => {
  const id = port?.sender?.tab?.id ?? 0

  // Port is undefined or zero, exit
  if (!id) return

  // Not sure about this, but seems working
  // https://developer.chrome.com/extensions/runtime#type-MessageSender
  // Property only be present when the connection was opened from a tab, and only if the receiver is an extension
  windows.ports[id] = port

  // On port disconnect
  port.onDisconnect.addListener(port => onPortDisconnect(port, id))

  // Content Script listener
  port.onMessage.addListener((message: Letter) => {
    contentScriptHandlers[message.subject as ContentScriptLetterSubject](message)
  })
})

// Background script listener
browser.runtime.onMessage.addListener(async (message: Letter, sender: Runtime.MessageSender) => {
  return handlers[message.subject as LetterSubject](message, sender)
})

// On installed / updated hooks, not yet implemented
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {

  } else if (details.reason === 'update') {

  }
})
