import { Vault } from '@/model/Vault'
import { AddressBook } from '@/model/AddressBook'

export type Ledger = {
  vault: Vault;
  addressBook: AddressBook;
};
