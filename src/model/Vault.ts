import { MinterWallet } from './Wallet'

export type Vault = {
  activeWallet: string;
  wallets: VaultWallets;
}

export type VaultWallets = {
  [address: string]: MinterWallet;
}
