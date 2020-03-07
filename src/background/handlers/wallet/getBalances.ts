import { Letter } from '@/model/Letter'
import Explorer from '@/providers/Explorer'
import { MinterWalletBalance } from '@/model/Wallet'

// Get Wallet balances by address
export async function handleGetWalletBalances (message: Letter): Promise<MinterWalletBalance[]> {
  return Explorer.getAddress(message.body)
}
