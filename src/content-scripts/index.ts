import ContentScript from './ContentScript'

const script = new ContentScript()

document.addEventListener('DOMContentLoaded', async () => {
  script.init()
})
