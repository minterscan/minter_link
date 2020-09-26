import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'
import WindowService from '@/services/Window'
import { notifyVaultActiveWalletChange } from '@/background/notifiers/vault'

// Delete Wallet by address
export async function handleCmdWalletDelete (message: Letter): Promise<string> {
  const activeWallet = await vault.deleteWallet(message.body)

  await vault.setActiveWallet(activeWallet)
  await notifyVaultActiveWalletChange()

  WindowService.closeAll()

  return vault.getActiveWalletAddress()
}
