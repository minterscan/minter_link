import { Letter } from '@/model/Letter'
import Explorer from '@/providers/ExplorerProvider'
import { MinterWalletTxs } from '@/model/Wallet'

// Get Wallet txs by address
export async function handleGetWalletTxs (message: Letter): Promise<MinterWalletTxs> {
  return Explorer.getAddressTxs(message.body)
}
