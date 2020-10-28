import keyring from '@/services/Keyring'
import { CreatePasswordLetter } from '@/model/Keyring'
import { ApplicationError, ErrorCode } from '@/model/Error'

const MIN_LENGTH = 8

function passwordsNotEqual (password: string, passwordRepeat: string): boolean {
  return password !== passwordRepeat
}

function passwordTooShort (password: string): boolean {
  return password.length < MIN_LENGTH
}

// Set Keyring key
export async function handleSetPassword (message: CreatePasswordLetter): Promise<number | undefined> {
  if (passwordsNotEqual(message.body.password, message.body.passwordRepeat)) {
    throw new ApplicationError(ErrorCode.PasswordMismatch)
  }

  if (passwordTooShort(message.body.password)) {
    throw new ApplicationError(ErrorCode.PasswordShort)
  }

  return keyring.create(message.body.password)
}
