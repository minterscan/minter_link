import { Coin } from '@/model/Coin'
import Explorer from '@/providers/Explorer'

// Get Minter network status
export async function handleGetNetworkStatus (): Promise<Coin[]> {
  return Explorer.getStatus()
}
