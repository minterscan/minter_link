import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'

// Check is password correct
export async function handleGetWalletSeed (message: Letter): Promise<string> {
  await vault.ping(message.body.password)

  const seed = await vault.getWalletSeed(message.body.address)

  return seed
}
