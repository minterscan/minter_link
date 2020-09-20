import keyring from '@/services/Keyring'

// Get Vault status: locked or unlocked
export async function handleGetVaultStatus (): Promise<boolean> {
  return keyring.key !== ''
}
