import { Vault } from '@/model/Vault'
import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'

// Set active Wallet Meta
export async function handleSetVaultActiveWalletMeta (message: Letter): Promise<Vault | null> {
  await vault.setActiveWalletMeta(message.body)

  return vault.getPublicData()
}
