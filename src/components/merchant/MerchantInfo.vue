<template>
  <div class="cp merchant-info">
    <!-- Filled -->
    <template v-if="data">
      <div class="name">
        {{ data.name || data.url }}
      </div>
      <div class="url">
        <a :href="data.url" target="_blank">{{ data.url }}</a>
      </div>
    </template>

    <!-- Empty -->
    <a-alert
      v-else
      type="error"
      message="Be careful! Merchant' data is empty. Double check all information before accept."
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
