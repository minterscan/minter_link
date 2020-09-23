import { notifyVaultActiveWalletChange } from '@/background/notifiers/vault'

// Empty stub
export async function handleConnectAccept (): Promise<void> {
  return notifyVaultActiveWalletChange()
}
