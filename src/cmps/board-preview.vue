<template>
  <li
    class="board-preview"
    v-if="board"
    @click="openBoard"
  >
    <div class="board-background" :style="{ backgroundImage: `url(${img})` }">
    <span></span>
    <div class="board-title">{{board.title}}</div>
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
    return {};
  },
  created() {},
  methods: {
    openBoard(){
      this.$router.push('/board/' + this.board._id)
    }
  },
  computed: {
    img() {
      return new URL(`${this.board.style.imgUrl}`, import.meta.url).href;
    },
  },
};
</script>

<style>
</style>