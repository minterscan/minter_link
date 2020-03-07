<template>
  <app class="app tab" />
</template>

<script lang="ts">
import App from '@/App.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'TabApp',
  components: { App }
})
export default class AppTab extends Vue {}
</script>
