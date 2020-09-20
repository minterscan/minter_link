import vault from '@/drivers/VaultDriver'

export async function handleCmdVaultDelete (): Promise<boolean> {
  return vault.destroy()
}
