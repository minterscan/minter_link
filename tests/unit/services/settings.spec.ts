import settings from '@/services/Settings'

const AUTOLOCK = 1

it('set autollock', () => {
  settings.setAutoLock(AUTOLOCK)

  expect(settings.autoLock).toEqual(AUTOLOCK)
})

it('get public data', () => {
  const data = settings.getPublicData()

  expect(data).toHaveProperty('autoLock')
})
