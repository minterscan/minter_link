import { AddressBook } from '@/model/AddressBook'
import addressBook from '@/drivers/AddressBookDriver'

// Get Address Book Public Data
export async function handleGetAddressBookPublicData (): Promise<AddressBook> {
  return addressBook.getPublicData()
}
