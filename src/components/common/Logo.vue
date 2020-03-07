<template>
  <div class="cp logo">
    <icon class="fingerprint" name="fingerprint" scale="11" />
    <icon class="bip" name="bip" scale="7" />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Mixins, Prop } from 'vue-property-decorator'

@Component({
  name: 'Logo',
  components: { Icon }
})
export default class Logo extends Mixins(Base) {
  @Prop({ default: false }) showText!: boolean

  get isHome (): boolean {
    return this.$route.path === ERouter.Home
  }
}
</script>
