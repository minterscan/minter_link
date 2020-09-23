<template>
  <div class="view about">
    <!-- Header -->
    <view-header title="About" />

    <!-- Content -->
    <div class="ant-typography content">
      <!-- Unicorn -->
      <icon class="fucking-awesome-unicorn" name="unicorn" scale="15" />

      <!-- About -->
      <p>
        <b>Minter Link</b> is an
        <a href="https://github.com/minterscan/minter_link" target="_blank">open-source</a>
        multi-wallet browser extension <br> for
        <a href="https://minter.org" target="_blank" title="Minter">Minter network</a>
        proudly developed by
        <a href="https://minterscan.net" target="_blank">Minterscan</a>
      </p>

      <!-- Donate -->
      <p>
        <address-link address="Mx77703bc82c53979e8e8f7f0a29bbe5cf12777777" text="Support us" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Logo from '@/components/common/Logo.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Mixins } from 'vue-property-decorator'
import ViewHeader from '@/components/common/ViewHeader.vue'
import AddressLink from '@/components/common/address/AddressLink.vue'

@Component({
  name: 'About',
  components: { AddressLink, Icon, Logo, ViewHeader }
})
export default class About extends Mixins(Base) {}
</script>
