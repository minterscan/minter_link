import settings from '@/services/Settings'
import { Settings } from '@/model/Settings'

// Get decoded Vault public data (without seeds)
export async function handleGetSettingsPublicData (): Promise<Settings> {
  return settings.getPublicData()
}
