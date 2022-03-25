<template class="board-list">
  <div :style="{ backgroundImage: `url(${img})` }">
      <h1 class="board-title">{{board.title}}</h1>
  </div>
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
  methods: {},
  computed: {
    img() {
            return new URL(`${this.board.style.imgUrl}`, import.meta.url).href
    }
  },
};
</script>

<style>
</style>