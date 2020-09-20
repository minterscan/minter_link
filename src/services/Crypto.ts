
import { SignResponse } from 'minter-connect'
import CryptoJS, { WordArray } from 'crypto-js'
import { addHexPrefix, toBuffer, bufferToHex } from 'ethereumjs-util/dist/bytes'
import { ecsign, toRpcSig, hashPersonalMessage } from 'ethereumjs-util/dist/signature'

/**
 * CryptoJS wrapper
 */
export class CryptoService {
  encryptSHA3 (message: string): string {
    return CryptoJS.SHA3(message).toString()
  }

  async sign (message: string, privateKey: Buffer): Promise<SignResponse> {
    const messageHex = Buffer.from(message).toString('hex')
    const personalMessage = hashPersonalMessage(toBuffer(addHexPrefix(messageHex)))
    const signature = ecsign(personalMessage, privateKey)
    const sigHex = toRpcSig(signature.v, signature.r, signature.s)

    return { signature: sigHex, personalMessage: bufferToHex(personalMessage) }
  }

  encryptAES (message: string, password: string): WordArray {
    return CryptoJS.AES.encrypt(message, password)
  }

  decryptAES (message: string, key: string): string {
    const result = CryptoJS.AES.decrypt(message, key)

    return result.toString(CryptoJS.enc.Utf8)
  }
}

export default new CryptoService()
