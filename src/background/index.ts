import handlers from '@/background/handlers'
import { Letter } from '@/model/Letter'
import { browser, Runtime } from 'webextension-polyfill-ts'

// Background script listener
browser.runtime.onMessage.addListener((request: Letter, sender: Runtime.MessageSender) => {
  try {
    return handlers[request.subject](request, sender)
  } catch (e) {
    throw new Error(`Unknown request type: ${request.subject}`)
  }
})

// On installed / updated hooks, not yet implemented
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {

  } else if (details.reason === 'update') {

  }
})
