import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'
import { VaultConnectedWebsites } from '@/model/Vault'
import { notifyVaultActiveWalletChange } from '@/background/notifiers/vault'

// Delete domain from connected websites list
export async function handleCmdConnectedWebsitesDelete (message: Letter): Promise<VaultConnectedWebsites> {
  const result = await vault.deleteConnectedWebsite(message.body)

  // Website disconnected, notify Content Script
  await notifyVaultActiveWalletChange()

  return result
}
