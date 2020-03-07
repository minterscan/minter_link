import CryptoJS, { WordArray } from 'crypto-js'

/**
 * CryptoJS wrapper
 */
export class CryptoService {
  public encryptSHA3 (message: string): string {
    return CryptoJS.SHA3(message).toString()
  }

  public encryptAES (message: string, password: string): WordArray {
    return CryptoJS.AES.encrypt(message, password)
  }

  public decryptAES (message: string, key: string): string {
    const result = CryptoJS.AES.decrypt(message, key)

    return result.toString(CryptoJS.enc.Utf8)
  }
}

export default new CryptoService()
