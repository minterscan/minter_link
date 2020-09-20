<template>
  <div class="view-header">
    <a-page-header
      :title="title"
      :sub-title="subtitle"
      @back="back()"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"><slot :name="slot" v-bind="scope"/></template>
    </a-page-header>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Component, Mixins, Prop } from 'vue-property-decorator'
import { ERouter } from '@/model/Router'

@Component
export default class ViewHeader extends Mixins(Base) {
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) subtitle!: string

  back (): void {
    this.$router.push(ERouter.Vault)
  }
}
</script>
