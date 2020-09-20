<template>
  <div class="cp logo">
    <icon class="logo" name="bip" scale="11" />
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
  @Prop({ default: false }) simple!: boolean

  get isHome (): boolean {
    return this.$route.path === ERouter.Home
  }
}
</script>
