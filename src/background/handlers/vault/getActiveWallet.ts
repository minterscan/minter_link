import vault from '@/drivers/VaultDriver'

// Set active Wallet
export async function handleGetVaultActiveWallet (): Promise<string> {
  return vault.getActiveWalletAddress()
}
