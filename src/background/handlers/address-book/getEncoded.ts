import addressBook from '@/drivers/AddressBookDriver'

// Get encoded Address Book string
export async function handleGetAddressBookEncoded (): Promise<string> {
  return addressBook.get()
}
