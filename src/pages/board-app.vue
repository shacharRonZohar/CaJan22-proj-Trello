<template>
  <section class="board-app flex" v-if="boards">
    <board-list-side-bar />
    <board-list :boards="boards" />
  </section>
</template>

<script>
import boardList from "../cmps/board-list.vue"
import boardListSideBar from "../cmps/board-list-side-bar.vue"
import { authService } from '../services/auth.service.js'
import { socketService } from '../services/socket.service'
export default {
  components: {
    boardList,
    boardListSideBar,
  },
  async created() {
    socketService.on('boards-updated', () => {
      this.$store.dispatch('loadBoards')
    })
    let user = this.$store.getters.loggedInUser
    console.log(user)
    if (!user) {
      user = {
        username: 'guest@ca.com',
        password: 'guest'
      }
      await authService.login(user)
      await this.$store.dispatch('loadUser')
    }
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
  unmounted() { },
}
</script>