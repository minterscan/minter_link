/* istanbul ignore file */

export enum LetterSubject {
  CmdWalletImport = 'cmd:wallet:import',
  CmdWalletDelete = 'cmd:wallet:delete',
  CmdWalletCreate = 'cmd:wallet:create',
  GetWalletBalances = 'get:wallet:balances',
  GetWalletTxs = 'get:wallet:txs',
  GetWalletDelegations = 'get:wallet:delegations',
  GetWalletSeed = 'get:wallet:seed',
  GetNetworkCoins = 'get:network:coins',
  GetNetworkStatus = 'get:network:status',
  GetNetworkValidators = 'get:network:validators',
  CmdVaultCreate = 'cmd:vault:create',
  CmdVaultPing = 'cmd:vault:ping',
  CmdVaultDelete = 'cmd:vault:delete',
  GetVaultStatus = 'get:vault:status',
  GetVaultEncoded = 'get:vault:encoded',
  GetVaultExist = 'get:vault:exist',
  GetVaultPublicData = 'get:vault:public',
  GetPasswordExpiry = 'get:password:expiry',
  SetPassword = 'set:password',
  SetVaultActiveWallet = 'set:vault:active_wallet',
  GetVaultActiveWallet = 'get:vault:active_wallet',
  SetVaultActiveWalletMeta = 'set:vault:active_wallet:meta',
  CmdConnectedWebsitesAdd = 'cmd:vault:websites:item:add',
  CmdConnectedWebsitesDelete = 'cmd:vault:websites:item:delete',
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
  GetSettingsPublicData = 'get:settings:public',
  SetSettingsAutoLock = 'set:settings:autolock',
  EstimateBuy = 'estimate:buy',
  EstimateSell = 'estimate:sell',
  ConnectRequest = 'connect:request',
  ConnectAccept = 'connect:accept',
  ConnectReject = 'connect:reject',
  CmdSign = 'cmd:sign',
  SignRequest = 'sign:request',
  SignAccept = 'sign:accept',
  SignReject = 'sign:reject',
  PaymentRequest = 'payment:request',
  PaymentAccept = 'payment:accept',
  PaymentReject = 'payment:reject',
}

export enum ContentScriptLetterSubject {
  EventVaultActiveWalletChange = 'event:vault:active_wallet:change',
  EventVaultStatusChange = 'event:vault:status:change',
  RequestVaultStatus = 'request:vault:status',
  ResponseVaultStatus = 'response:vault:status',
  RequestVaultActiveWallet = 'request:vault:active_wallet',
  ResponseVaultActiveWallet = 'response:vault:active_wallet',
}

export interface Letter {
  subject: LetterSubject | ContentScriptLetterSubject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}
