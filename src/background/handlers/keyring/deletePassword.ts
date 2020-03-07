import keyring from '@/services/Keyring'

// Delete Keyring key
export function handleDeletePassword (): Promise<void> {
  return new Promise((resolve) => {
    keyring.destroy()

    resolve()
  })
}
