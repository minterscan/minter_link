import { notifyVaultActiveWalletChange } from '@/background/notifiers/vault'

export async function handleRequestVaultActiveWallet (): Promise<void> {
  await notifyVaultActiveWalletChange()
}
