import { Vault } from '@/model/Vault'
import Wallet from '@/services/Wallet'
import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'

// Import Wallet from seed & push to Vault
export async function handleCmdWalletImport (message: Letter): Promise<Vault> {
  if (Wallet.verifySeed(message.body.seed)) {
    const wallet = Wallet.getMinterWallet(message.body.seed, message.body.meta)

    await vault.addWallet(wallet)
    await vault.setActiveWallet(wallet.address)

    return vault.getPublicData()
  }

  throw new Error('Invalid seed')
}
