<template>
  <div class="cp merchant-info">
    <template v-if="data">
      <div class="name" v-if="data.name">{{ data.name }}</div>
      <div class="url">
        <a :href="data.url" target="_blank" v-if="data.url">{{ data.url }}</a>
      </div>
    </template>
    <a-alert
      v-else
      type="error"
      message="Be careful! Merchant' data is empty. Probably, it's a scam attempt."
    />
  </div>
</template>

<script lang="ts">
import { Merchant } from 'minter-connect'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MerchantInfo extends Vue {
  @Prop({ default: null }) data!: Merchant | null
}
</script>
