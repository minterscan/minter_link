import RootStore from '@/store'
import AddressBookStore from '@/store/addressBook'
import { getModule } from 'vuex-module-decorators'

const addressBook = getModule(AddressBookStore, RootStore)

it('get book', () => {
  expect(addressBook.book).toStrictEqual({})
})

it('create book', () => {
  const address = 'address1'
  const label = 'Bob'

  addressBook.commitBook({
    [address]: {
      address,
      label
    }
  })

  expect(addressBook.book).toHaveProperty(address)
  expect(addressBook.book[address]).toHaveProperty('label')
  expect(addressBook.book[address]).toHaveProperty('address')
  expect(addressBook.book[address].label).toEqual(label)
  expect(addressBook.book[address].address).toEqual(address)
})

it('add item', () => {
  const address = 'address2'
  const label = 'Alice'

  addressBook.commitItemEdit({
    address,
    label
  })

  expect(Object.keys(addressBook.book).length).toEqual(2)
  expect(addressBook.book[address].label).toEqual(label)
  expect(addressBook.book[address].address).toEqual(address)
})

it('edit item', () => {
  const address = 'address1'
  const label = 'Clark'

  addressBook.commitItemEdit({
    address,
    label
  })

  expect(addressBook.book[address].label).toEqual(label)
})

it('get sorted book', () => {
  addressBook.commitItemEdit({
    address: 'address3',
    label: 'Alice'
  })
  addressBook.commitItemEdit({
    address: 'address4',
    label: 'Zoe'
  })

  const result = addressBook.sorted

  expect(result[0]).toEqual('address2')
})

it('delete item', () => {
  const address = 'address1'

  addressBook.commitItemDelete(address)

  expect(addressBook.book[address]).toEqual(undefined)
})
