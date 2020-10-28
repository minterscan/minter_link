import Explorer from '@/providers/ExplorerProvider'
import { NetworkStatus } from '@/model/Network'

// Get Minter network status
export async function handleGetNetworkStatus (): Promise<NetworkStatus> {
  return Explorer.getStatus()
}
