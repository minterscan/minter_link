import { Vault } from '@/model/Vault'
import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'

// Set active Wallet
export async function handleSetVaultActiveWallet (message: Letter): Promise<Vault | null> {
  await vault.setActiveWallet(message.body)

  return vault.getPublicData()
}
