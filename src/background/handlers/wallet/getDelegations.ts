import { Letter } from '@/model/Letter'
import Explorer from '@/providers/ExplorerProvider'
import { MinterWalletDelegations } from '@/model/Wallet'

// Get Wallet delegations by address
export async function handleGetWalletDelegations (message: Letter): Promise<MinterWalletDelegations> {
  return Explorer.getAddressDelegations(message.body)
}
