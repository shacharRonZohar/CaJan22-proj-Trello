
<template>
  <app-header />
  <router-view />
  <pre>{{ boards }}</pre>
</template>

<script>
import appHeader from './components/app-header.vue'
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