<template>
  <div class="view about">
    <h2 class="ant-typography">About</h2>
    <p>
      <b>Minter Link</b> is open-source multi-wallet browser extension for
      <a href="https://minter.network" target="_blank" title="Minter">Minter</a> network.
    </p>
    <h2 class="ant-typography">Links</h2>
    <ul>
      <li v-for="(item, key) in links" :key="key">
        <a :href="item.url" :title="item.title" target="_blank">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import pckg from './../../package.json'
import Logo from '@/components/common/Logo.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'About',
  components: { Icon, Logo }
})
export default class About extends Mixins(Base) {
  protected links = [
    {
      url: pckg.repository.url,
      title: 'Source Code'
    },
    {
      url: 'https://minterscan.net',
      title: 'Blockchain Explorer'
    },
    {
      url: 'https://en.minter.wiki',
      title: 'Knowledge Base'
    }
  ]
}
</script>
