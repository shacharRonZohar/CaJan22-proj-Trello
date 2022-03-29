<template>
  <li class="board-preview" v-if="board" @click="openBoard">
    <div
      class="board-background"
      :style="{ backgroundImage: `url('${img}')`, backgroundColor: `${color}` }"
    >
      <span></span>
      <div class="board-title">{{ board.title }}</div>
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
    return {}
  },
  created() { },
  methods: {
    openBoard() {
      this.$router.push('/board/' + this.board._id)
    }
  },
  computed: {
    img() {
      // console.log(this.board.style.imgUrl)
      return this.board.style.imgUrl
        ? new URL(`${this.board.style.imgUrl}`, import.meta.url).href
        : ""
    },
    color() {
      return this.board.style.color
        ? this.board.style.color
        : ""
    },
    // img() {
    //   return new URL(`${this.board.style.imgUrl}`, import.meta.url).href;
    // },
  },
}
</script>

<style>
</style>