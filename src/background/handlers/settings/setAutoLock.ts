import { Letter } from '@/model/Letter'
import settings from '@/services/Settings'

export async function handleSetSettingsAutoLock (message: Letter): Promise<number> {
  settings.setAutoLock(message.body)

  return settings.autoLock
}
