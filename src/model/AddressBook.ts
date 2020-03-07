export type AddressBook = {
  [address: string]: AddressBookItem;
}

export type AddressBookItem = {
  address: string;
  label: string;
}
