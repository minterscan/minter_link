import { Letter } from '@/model/Letter'
import keyring from '@/services/Keyring'

// Set Keyring key
export async function handleSetPassword (message: Letter): Promise<number | undefined> {
  return keyring.create(message.body)
}
