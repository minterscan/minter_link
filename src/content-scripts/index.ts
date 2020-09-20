import ContentScript from './ContentScript'
import { injectScript } from './InjectScript'

injectScript()

// Wait for DOM ready
document.addEventListener('DOMContentLoaded', async () => {
  const script = new ContentScript()

  script.subscribe()
  script.init()
})
