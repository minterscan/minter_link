import keyring from '@/services/Keyring'
import vault from '@/drivers/VaultDriver'
import windows from '@/background/store/windows'
import { ContentScriptLetterSubject } from '@/model/Letter'

// Notify Content Script about Vault status change
export async function notifyVaultStatusChange () {
  try {
    Object.keys(windows.ports).forEach(key => {
      windows.ports[key].postMessage({
        subject: ContentScriptLetterSubject.ResponseVaultStatus,
        body: keyring.key !== ''
      })
    })
  } catch (e) {
    console.error(e)
  }
}

// Notify Content Script about Active Wallet change
export async function notifyVaultActiveWalletChange () {
  try {
    const address = await vault.getActiveWalletAddress()
    const connectedWebsites = await vault.getConnectedWebsites()

    Object.keys(windows.ports).map(key => {
      let body = address
      const name = windows.ports[key].name

      if (!(address in connectedWebsites) || !(name in connectedWebsites[address])) {
        body = ''
      }

      windows.ports[key].postMessage({
        subject: ContentScriptLetterSubject.ResponseVaultActiveWallet,
        body
      })
    })
  } catch (e) {
    console.error(e)
  }
}
