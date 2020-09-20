import { Vault } from '@/model/Vault'
import Wallet from '@/services/Wallet'
import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'
import { Runtime } from 'webextension-polyfill-ts'
import { notifyVaultActiveWalletChange } from '@/background/notifiers/vault'

// Generate new Wallet & push it to Vault
export async function handleCmdWalletCreate (message: Letter, sender: Runtime.MessageSender): Promise<Vault> {
  const seed = Wallet.generate()

  if (Wallet.verifySeed(seed)) {
    const wallet = Wallet.getMinterWallet(seed, message.body)

    await vault.addWallet(wallet)
    await vault.setActiveWallet(wallet.address)
    await notifyVaultActiveWalletChange()

    return vault.getPublicData()
  }

  throw new Error('Invalid seed')
}
