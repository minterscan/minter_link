import { Letter } from '@/model/Letter'
import { AddressBookItem } from '@/model/AddressBook'
import AddressBookDriver from '@/drivers/AddressBookDriver'

// Add item to Address Book
export async function handleCmdAddressBookItemAdd (message: Letter): Promise<AddressBookItem> {
  return AddressBookDriver.addItem(message.body as AddressBookItem)
}
