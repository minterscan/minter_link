import vault from '@/drivers/VaultDriver'

// Check is Vault created
export async function handleGetVaultExist (): Promise<boolean> {
  return vault.exist()
}
