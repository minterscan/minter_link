export type Tx = {
  txn: number;
  hash: string;
  nonce: number;
  block: number;
  timestamp: string;
  fee: string;
  type: ETxType;
  payload: string;
  from: string;
  data: TxData;
}

export type TxCoin = {
  id: number;
  symbol: string;
}

export type TxData = {
  coin?: TxCoin;
  to?: string;
  value?: string;
  coin_to_sell?: TxCoin;
  coin_to_buy?: TxCoin;
  value_to_sell?: string;
  value_to_buy?: string;
  minimum_value_to_buy?: string;
  maximum_value_to_sell?: string;
  name?: string;
  symbol?: string;
  initial_amount?: string;
  initial_reserve?: string;
  crr?: string;
  address?: string;
  pub_key?: string;
  commission?: string;
  stake?: string;
  check?: Check;
  proof?: string;
  threshold?: string;
  weights?: string;
  addresses?: string;
  list?: MultisendItem[];
  reward_address?: string;
  owner_address?: string;
}

export type Check = {
  coin: TxCoin;
  nonce: string;
  value: string;
  sender: string;
  due_block: number;
}

export type MultisendItem = {
  coin: TxCoin;
  to: string;
  value: string;
}

export type PreparedTxData = {
  serialize: Function;
}

export type TxSendRequest = {
  address: string;
  gasCoin: number;
  coin: number;
  amount: string;
  payload: string;
}

export type TxDelegateRequest = {
  pubKey: string;
  coin: number;
  gasCoin: number;
  stake: string;
  payload: string;
}

export type TxUnbondRequest = {
  pubKey: string;
  coin: number;
  gasCoin: number;
  stake: string;
  payload: string;
}

export type TxBuyRequest = {
  gasCoin: number;
  coinIdToBuy: number;
  valueToBuy: string;
  coinIdToSell: number;
  payload: string;
}

export type TxSellRequest = {
  gasCoin: number;
  coinIdToSell: number;
  valueToSell: string;
  coinIdToBuy: number;
  payload: string;
}

export type TxSellAllRequest = {
  gasCoin: number;
  coinIdToSell: number;
  coinIdToBuy: number;
  payload: string;
}

export enum ETxType {
  Send = 1,
  SellCoin = 2,
  SellAllCoin = 3,
  BuyCoin = 4,
  CreateCoin = 5,
  DecalareCandidacy = 6,
  Delegate = 7,
  Unbond = 8,
  RedeemCheck = 9,
  SetCandidateOnline = 10,
  SetCandidateOffline = 11,
  CreateMultisig = 12,
  Multisend = 13,
  EditCandidate = 14
}
