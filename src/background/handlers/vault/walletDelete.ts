import vault from '@/drivers/VaultDriver'
import { notifyVaultActiveWalletChange } from '@/background/notifiers/vault'

// Delete Wallet from Vault
export async function handleCmdWalletDelete (): Promise<string> {
  const address = await vault.deleteWallet()

  await vault.setActiveWallet(address)
  await notifyVaultActiveWalletChange()

  return vault.getActiveWalletAddress()
}
