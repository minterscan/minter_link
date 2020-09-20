import './subscribers'
import { EPort } from '@/model/Port'
import windows from '@/background/store/windows'
import { browser, Runtime } from 'webextension-polyfill-ts'
import { handlers, contentScriptHandlers } from '@/background/handlers'
import { Letter, LetterSubject, ContentScriptLetterSubject } from '@/model/Letter'

// Port listener
browser.runtime.onConnect.addListener(port => {
  if (!port.sender) return
  if (!port.sender.tab) return
  if (!port.sender.tab.id) return

  const id = port.sender?.tab?.id

  // On port disconnect
  port.onDisconnect.addListener(() => {
    // Delete dead ports
    delete windows.ports[id]

    // On notification ports close
    if (port.name === EPort.Sign) windows.interact.sign = false
    if (port.name === EPort.Connect) windows.interact.connect = false
    if (port.name === EPort.Payment) windows.interact.payment = false
  })

  // Not sure about this, but seems working
  // https://developer.chrome.com/extensions/runtime#type-MessageSender
  // Property only be present when the connection was opened from a tab, and only if the receiver is an extension
  windows.ports[id] = port

  // Content Script listener
  port.onMessage.addListener((message: Letter, port: Runtime.Port) => {
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
