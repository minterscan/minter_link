import Wallet from '@/services/Wallet'
import crypto from '@/services/Crypto'
import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'

export async function handleCmdSign (message: Letter): Promise<string> {
  const seed = await vault.getActiveWalletSeed()
  const privateKey = Wallet.getPrivateKey(seed)

  return crypto.sign(message.body, privateKey)
}
