import keyring from '@/services/Keyring'

// Delete Keyring key
export async function handleDeletePassword (): Promise<void> {
  keyring.destroy()
}
