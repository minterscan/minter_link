import { Vault } from '@/model/Vault'
import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'
import WindowService from '@/services/Window'
import { notifyVaultActiveWalletChange } from '@/background/notifiers/vault'

// Set active Wallet
export async function handleSetVaultActiveWallet (message: Letter): Promise<Vault | null | undefined> {
  try {
    await vault.setActiveWallet(message.body)
    await notifyVaultActiveWalletChange()

    WindowService.closeAll()

    return vault.getPublicData()
  } catch (e) {
    console.error(e)
  }
}
