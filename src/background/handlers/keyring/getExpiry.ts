import keyring from '@/services/Keyring'

// Get Keyring expiry
export async function handleGetPasswordExpiry (): Promise<number> {
  return keyring.expiry
}
