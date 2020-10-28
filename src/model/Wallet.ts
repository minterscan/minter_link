import { Tx, TxCoin } from '@/model/Tx'
import { ExplorerLinks, ExplorerMeta } from '@/model/Explorer'

export type MinterWalletAddRequest = {
  seed: string;
  meta: MinterWalletMeta;
}

export type MinterWallet = {
  seed?: string;
  address: string;
  balances?: MinterWalletBalance[];
  meta: MinterWalletMeta;
  txs?: MinterWalletTxs;
}

export enum UIWalletData {
  Transactions = 'txs',
  Balances = 'balances',
  Delegations = 'delegations'
}

export enum UIWalletConvertMode {
  Buy = 0,
  Sell = 1,
  SellAll = 2
}

export type UIWalletButtons = {
  [key in UIWalletData]: UIWalletButton;
}

export type UIWalletButton = {
  icon: string;
  label: string;
}

export type MinterWalletMeta = {
  label: string;
  icon: string;
}

export type MinterWalletBalance = {
  coin: TxCoin;
  amount: string;
}

export type MinterWalletTxs = {
  data: Tx[];
  links: ExplorerLinks;
  meta: ExplorerMeta;
}

export type MinterWalletDelegations = {
  data: Delegation[];
  links: ExplorerLinks;
  meta: ExplorerMeta;
}

export type Delegation = {
  coin: string;
  value: string;
  bip_value: string;
  pub_key: string;
  validator_meta: ValidatorMeta;
}

export type ValidatorMeta = {
  name: string;
  description: string;
  icon_url: string;
  site_url: string;
}

export enum ECoin {
  BIP = 0
}
