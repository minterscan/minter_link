import keyring from '@/services/Keyring'
import { Letter } from '@/model/Letter'

// Set Keyring key
export function handleSetPassword (message: Letter): Promise<number> {
  return new Promise((resolve) => {
    resolve(keyring.create(message.body))
  })
}
