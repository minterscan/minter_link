import { Vault } from '@/model/Vault'
import vault from '@/drivers/VaultDriver'

// Get decoded Vault public data (without seeds)
export async function handleGetVaultPublicData (): Promise<Vault> {
  return vault.getPublicData()
}
