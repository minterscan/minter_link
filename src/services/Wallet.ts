import { MinterWallet, MinterWalletMeta } from '@/model/Wallet'
import { generateMnemonic, isValidMnemonic, walletFromMnemonic } from 'minterjs-wallet'

/**
 * Minter Wallet Service
 */
export default class WalletService {
  /**
   * Generate new seed
   */
  static generate () {
    return generateMnemonic()
  }

  /**
   * Verify seed
   *
   * @param seed
   */
  static verifySeed (seed: string): boolean {
    return !!isValidMnemonic(seed)
  }

  /**
   * Get private key from seed
   *
   * @param seed
   */
  static getPrivateKey (seed: string): Buffer {
    const wallet = walletFromMnemonic(seed)

    return wallet.getPrivateKey()
  }

  /**
   * Get address string from seed
   *
   * @param seed
   */
  static getAddress (seed: string): string {
    const wallet = walletFromMnemonic(seed)

    return wallet.getAddressString()
  }

  /**
   * Get Wallet data from seed & meta
   *
   * @param seed
   * @param meta
   */
  static getMinterWallet (seed: string, meta: MinterWalletMeta): MinterWallet {
    const address = WalletService.getAddress(seed)

    return {
      seed,
      address,
      meta
    }
  }
}
