import keyring from '@/services/Keyring'

// Get Keyring expiry
export function handleGetPasswordExpiry (): Promise<number> {
  return new Promise((resolve) => {
    resolve(keyring.expiry)
  })
}
