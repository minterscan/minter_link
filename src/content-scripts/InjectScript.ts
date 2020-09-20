export function injectScript () {
  try {
    const container = document.head || document.documentElement
    const scriptTag = document.createElement('script')
    scriptTag.setAttribute('async', 'false')
    scriptTag.textContent = 'window.minter = true'
    container.insertBefore(scriptTag, container.children[0])
    container.removeChild(scriptTag)
  } catch (e) {
    console.error('Minter Link provider injection failed.', e)
  }
}
