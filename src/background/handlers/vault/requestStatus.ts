import { notifyVaultStatusChange } from '@/background/notifiers/vault'

// Request Vault status: locked/unlocked
export async function handleRequestVaultStatus (): Promise<void> {
  await notifyVaultStatusChange()
}
