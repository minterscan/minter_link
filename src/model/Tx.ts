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

export type TxData = {
  coin?: string;
  to?: string;
  value?: string;
  coin_to_sell?: string;
  coin_to_buy?: string;
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
  coin: string;
  nonce: string;
  value: string;
  sender: string;
  due_block: number;
}

export type MultisendItem = {
  coin: string;
  to: string;
  value: string;
}

export type PreparedTxData = {
  serialize: Function;
}

export type TxSendRequest = {
  address: string;
  coin: string;
  amount: string;
  payload: string;
}

export type TxDelegateRequest = {
  pubKey: string;
  coin: string;
  stake: string;
  payload: string;
}

export type TxUnbondRequest = {
  pubKey: string;
  coin: string;
  stake: string;
  payload: string;
}

export type TxBuyRequest = {
  coinToBuy: string;
  valueToBuy: string;
  coinToSell: string;
  payload: string;
}

export type TxSellRequest = {
  coinToSell: string;
  valueToSell: string;
  coinToBuy: string;
  payload: string;
}

export type TxSellAllRequest = {
  coinToSell: string;
  coinToBuy: string;
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
