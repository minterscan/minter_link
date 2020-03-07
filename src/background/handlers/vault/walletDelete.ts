import vault from '@/drivers/VaultDriver'

// Delete Wallet from Vault
export async function handleCmdWalletDelete (): Promise<string> {
  const address = await vault.deleteWallet()

  await vault.setActiveWallet(address)

  return vault.getActiveWalletAddress()
}
