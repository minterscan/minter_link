<template>
  <div class="view about">
    <!-- Header -->
    <view-header title="About" />

    <!-- Content -->
    <div class="ant-typography">
      <p>
        <b>Minter Link</b> is open-source multi-wallet browser extension for
        <a href="https://minter.network" target="_blank" title="Minter">Minter</a> network.
      </p>
      <h2>Links</h2>
      <ul>
        <li v-for="(item, key) in links" :key="key">
          <a :href="item.url" :title="item.title" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import pckg from './../../package.json'
import Logo from '@/components/common/Logo.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Mixins } from 'vue-property-decorator'
import ViewHeader from '@/components/common/ViewHeader.vue'

@Component({
  name: 'About',
  components: { Icon, Logo, ViewHeader }
})
export default class About extends Mixins(Base) {
  links = [
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
