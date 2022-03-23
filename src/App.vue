
<template class="main-layout">
  <app-header />
  <router-view />
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
    }
  }
}
</script>