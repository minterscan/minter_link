import crypto from '@/services/Crypto'
import { Ledger } from '@/model/Ledger'
import { AddressBook, AddressBookItem } from '@/model/AddressBook'
import { EncryptedStorageDriver } from '@/drivers/EncryptedStorageDriver'

/**
 * Encrypted Address Book Driver
 */
export class AddressBookDriver extends EncryptedStorageDriver {
  /**
   * Get Address Book public data:
   *
   * - items[]
   * -- address
   * -- label
   */
  async getPublicData (): Promise<AddressBook> {
    const ledger = await this.open()

    return ledger.addressBook as AddressBook
  }

  /**
   * Add Item to Address Book
   *
   * @param item
   */
  async addItem (item: AddressBookItem): Promise<AddressBookItem> {
    const ledger: Ledger = await this.open()

    ledger.addressBook[item.address] = item

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())

    return item
  }

  /**
   * Delete Item from Address Book
   *
   * @param address
   */
  async deleteItem (address: string): Promise<AddressBook> {
    const ledger = await this.open()

    delete ledger.addressBook[address]

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())

    return ledger.addressBook
  }
}

export default new AddressBookDriver()
