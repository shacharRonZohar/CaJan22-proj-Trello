<template>
  <li class="board-preview" v-if="board" @click="openBoard">
    <div
      class="board-background"
      :style="{ backgroundImage: `url('${img}')`, backgroundColor: `${color}` }"
    >
      <span></span>
      <div class="board-title">{{ board.title }}</div>

      <div class="flex star-container" :class="isStared">
      <a class="unstarred-icon" @click.stop="starredToggle" />
      <a class="starred-icon" @click.stop="starredToggle"/>
      </div>

    </div>
  </li>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {

    }
  },
  created() { },
  methods: {
    openBoard() {
      this.$router.push('/board/' + this.board._id)
    },
    async starredToggle(){
      await this.$store.dispatch({
        type: 'starredBoardToggle',
        board: this.board
      })
    }
  },
  computed: {
    img() {
      // console.log(this.board.style.imgUrl)
      return this.board.style?.imgUrl || ''
    },
    color() {
      return this.board.style?.color
        ? this.board.style.color
        : ""
    },
    isStared(){
      const user = this.$store.getters.loggedInUser
      return this.board.starredBy?.includes(user._id)? 'starred' : ''
    }
  },
}
</script>

<style>
</style>