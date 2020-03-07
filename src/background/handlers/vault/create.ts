import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'

// Create empty Vault or Import Vault from string
export async function handleCmdVaultCreate (message: Letter): Promise<boolean> {
  return vault.create(message.body)
}
