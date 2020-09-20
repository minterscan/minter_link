export enum ErrorCode {
  Unauthorized = '0',
  PasswordShort = '10',
  PasswordMismatch = '11',
  PasswordWrong = '12',
  SeedInvalid = '20',
  IncufficientFunds = '107',
  CoinSupplyOverflow = '112',
  SellAllIncufficientFunds = '303',
  StakeNotFound = '404',
  StakeLow = '409',
  StorageSave = '900',
  StorageDestroy = '901'
}

export type MessageMap = {
  [code: string]: string;
}

export const ErrorMessageMap: MessageMap = {
  [ErrorCode.Unauthorized]: 'Unathorized',
  [ErrorCode.PasswordShort]: 'Password too short',
  [ErrorCode.PasswordMismatch]: 'Passwords does not match',
  [ErrorCode.PasswordWrong]: 'Wrong password',
  [ErrorCode.SeedInvalid]: 'Invalid seed',
  [ErrorCode.StorageSave]: 'Can not save data to storage',
  [ErrorCode.StorageDestroy]: 'Can not destroy storage',
  [ErrorCode.IncufficientFunds]: 'Insufficient funds',
  [ErrorCode.CoinSupplyOverflow]: 'Coin supply overflow',
  [ErrorCode.SellAllIncufficientFunds]: 'Insufficient funds',
  [ErrorCode.StakeNotFound]: 'Stake not found',
  [ErrorCode.StakeLow]: 'Stake is too low'
}

export class ApplicationError extends Error {
  constructor (code: ErrorCode) {
    super(code)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
