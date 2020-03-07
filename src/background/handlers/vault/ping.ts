import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'

// Check is password correct
export async function handleCmdVaultPing (message: Letter): Promise<void> {
  return vault.ping(message.body)
}
