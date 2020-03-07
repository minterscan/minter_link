import vault from '@/drivers/VaultDriver'

// Get encoded Vault string
export async function handleGetVaultEncoded (): Promise<string> {
  return vault.get()
}
