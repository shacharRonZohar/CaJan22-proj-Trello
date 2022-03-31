
<template class="main-layout" >
  <header-container v-if="isReady" />
  <router-view v-if="isReady" />
  <div v-else class="loading-container">
    <span class="loading-gif"></span>
  </div>
</template>

<script>
import headerContainer from './cmps/header-container.vue'
export default {
  components: {
    headerContainer
  },
  async created() {
    // console.log()
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