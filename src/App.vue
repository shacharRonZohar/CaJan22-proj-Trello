
<template class="main-layout" >
  <header-container v-if="isReady" />
  <router-view v-if="isReady" />
  <loading-gif />
</template>

<script>
import headerContainer from './cmps/header-container.vue'
import loadingGif from './pages/loading-gif.vue'

export default {
  components: {
    headerContainer,
    loadingGif
  },
  async created() {
    await this.$store.dispatch('loadUser')
  },
  computed: {
    boards() {
      return this.$store.getters.boards
    },
    isReady() {
      return this.$store.getters.isReady
    },
    isReadyClass() {
      return {
        'loading-layout': this.isReady
      }
    }
  }
}
</script>