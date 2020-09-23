export enum AppEvent {
  Login = 'login',
  TxHash = 'tx:hash',
  FormSubmit = 'form:submit',
  FormReset = 'form:reset',
  FormInvalid = 'form:invalid',
  FormSuccess = 'form:success',
  WalletMetaOpen = 'wallet:meta:open',
  WalletSeed = 'wallet:seed',
  WalletActionSendOpen = 'wallet:action:send:open',
  WalletActionSendClose = 'wallet:action:send:close',
  WalletActionConvertOpen = 'wallet:action:convert:open',
  WalletActionConvertClose = 'wallet:action:convert:close',
  WalletActionDelegateOpen = 'wallet:action:delegate:open',
  WalletActionDelegateClose = 'wallet:action:delegate:close',
  WalletActionUnbondOpen = 'wallet:action:unbond:open',
  WalletActionUnbondClose = 'wallet:action:unbond:close',
  AddressBookItemOpen = 'address_book:item:open',
  ExportSeedUnlock = 'vault:export_seed:unlock:open',
  WalletDeleteUnlock = 'vault:wallet_delete:unlock:open',
  VaultDeleteUnlock = 'vault:delete:unlock:open',
  VaultUnlocked = 'vault:unlocked'
}

export enum AppSendMode {
  Address = 'address',
  Contact = 'contact',
  Wallet = 'wallet'
}
