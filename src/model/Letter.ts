export enum LetterSubject {
  CmdWalletImport = 'cmd:wallet:import',
  CmdWalletDelete = 'cmd:wallet:delete',
  CmdWalletCreate = 'cmd:wallet:create',
  GetWalletBalances = 'get:wallet:balances',
  GetWalletTxs = 'get:wallet:txs',
  GetWalletDelegations = 'get:wallet:delegations',
  GetCoins = 'get:coins',
  GetValidators = 'get:validators',
  CmdVaultCreate = 'cmd:vault:create',
  CmdVaultPing = 'cmd:vault:ping',
  GetVaultStatus = 'get:vault:status',
  GetVaultEncoded = 'get:vault:encoded',
  GetVaultExist = 'get:vault:exist',
  GetVaultPublicData = 'get:vault:public',
  GetPasswordExpiry = 'get:password:expiry',
  SetPassword = 'set:password',
  SetVaultActiveWallet = 'set:vault:active_wallet',
  SetVaultActiveWalletMeta = 'set:vault:active_wallet:meta',
  DeletePassword = 'delete:password',
  TxSend = 'tx:send',
  TxBuy = 'tx:buy',
  TxSell = 'tx:sell',
  TxSellAll = 'tx:sell_all',
  TxDelegate = 'tx:delegate',
  TxUnbond = 'tx:unbond',
  GetAddressBookPublicData= 'get:address_book:public',
  GetAddressBookEncoded = 'get:address_book:encoded',
  CmdAddressBookItemAdd = 'cmd:address_book:item:add',
  CmdAddressBookItemDelete = 'cmd:address_book:item:delete',
  EstimateBuy = 'estimate:buy',
  EstimateSell = 'estimate:sell',
  PaymentRequest = 'payment:request',
  PaymentAccept = 'payment:accept',
  PaymentReject = 'payment:reject'
}

export interface Letter {
  subject: LetterSubject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}
