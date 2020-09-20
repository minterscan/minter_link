<template>
  <a-button class="expand" type="dashed" shape="circle" icon="arrows-alt" size="large" @click="expand()" />
</template>

<script lang="ts">
import { browser } from 'webextension-polyfill-ts'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ClipboardButton extends Vue {
  async expand (): Promise<void> {
    await browser.tabs.create({ url: browser.runtime.getURL('tab.html') })
  }
}
</script>
