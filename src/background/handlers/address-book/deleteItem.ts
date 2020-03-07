import { Letter } from '@/model/Letter'
import { AddressBook } from '@/model/AddressBook'
import AddressBookDriver from '@/drivers/AddressBookDriver'

// Delete Item from Address Book
export async function handleCmdAddressBookItemDelete (message: Letter): Promise<AddressBook> {
  return AddressBookDriver.deleteItem(message.body as string)
}
