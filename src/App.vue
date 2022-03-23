
<template class="main-layout">
  <app-header />
  <router-view v-if="isReady" />
  <span v-else>Loading...</span>
  <pre>{{ boards }}</pre>
</template>

<script>
import appHeader from './cmps/app-header.vue'
export default {
  components: {
    appHeader
  },
  created() {
    this.$store.dispatch('loadBoards')
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
    isReady() {
      return this.$store.getters.isReady
    }
  }
}
</script>