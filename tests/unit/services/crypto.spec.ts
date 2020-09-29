import { 
  hashSHA3,
  hashAES,
  message, 
  password,
  privateKey,
  signature 
} from '../util'
import crypto from '@/services/Crypto'

it('encrypt message with SHA3', () => {
  const result = crypto.encryptSHA3(message)

  expect(result).toEqual(hashSHA3)
})

it('sign message with private key', async () => {
  const result = await crypto.sign(message, Buffer.from(privateKey, 'hex'))
  
  expect(result).toEqual(signature)
})

it('encrypt message with AES', () => {
  const result = crypto.encryptAES(message, password)

  expect(result).toHaveProperty('ciphertext')
})

it('decrypt AES hash with password', () => {
  const result = crypto.decryptAES(hashAES, password)

  expect(result).toEqual(message)
})