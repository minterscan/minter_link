import { Vault } from '@/model/Vault'
import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'
import { Runtime } from 'webextension-polyfill-ts'
import { notifyVaultActiveWalletChange } from '@/background/notifiers/vault'

// Set active Wallet
export async function handleSetVaultActiveWallet (message: Letter, sender: Runtime.MessageSender): Promise<Vault | null | undefined> {
  try {
    await vault.setActiveWallet(message.body)
    await notifyVaultActiveWalletChange()

    return vault.getPublicData()
  } catch (e) {
    console.error(e)
  }
}
