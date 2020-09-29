import { MinterWallet } from './Wallet'

export type Vault = {
  activeWallet: string;
  wallets: VaultWallets;
  connectedWebsites: VaultConnectedWebsites;
}

export type VaultConnectedWebsites = {
  [address: string]: {
    [domain: string]: number;
  };
}

export type VaultWallets = {
  [address: string]: MinterWallet;
}

export type DeleteConnectedWebsiteRequest = {
  address: string;
  domain: string;
}
