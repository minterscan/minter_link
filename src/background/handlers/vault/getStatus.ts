import keyring from '@/services/Keyring'

// Get Vault status: locked or unlocked
export function handleGetVaultStatus (): Promise<boolean> {
  return new Promise(resolve => {
    resolve(!!keyring.key)
  })
}
