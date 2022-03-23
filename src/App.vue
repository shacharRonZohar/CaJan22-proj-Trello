
<template class="main-layout">
  <header-container />
  <router-view v-if="isReady" />
  <span v-else>Loading...</span>
</template>

<script>
import headerContainer from './cmps/header-container.vue'
export default {
  components: {
    headerContainer
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