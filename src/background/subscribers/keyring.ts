import keyring, { ObservableProps } from '@/services/Keyring'
import { notifyVaultActiveWalletChange, notifyVaultStatusChange } from '@/background/notifiers/vault'

keyring.subscribe(ObservableProps.Key, async () => {
  await notifyVaultStatusChange()
  await notifyVaultActiveWalletChange()
})
