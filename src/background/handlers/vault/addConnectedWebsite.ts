import { Letter } from '@/model/Letter'
import vault from '@/drivers/VaultDriver'
import { VaultConnectedWebsites } from '@/model/Vault'

// Add domain to connected websites list
export async function handleCmdConnectedWebsitesAdd (message: Letter): Promise<VaultConnectedWebsites> {
  return vault.addConnectedWebsite(message.body)
}
