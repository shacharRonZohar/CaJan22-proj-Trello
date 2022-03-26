<template>
<section class="board-list-container">
  <div class="flex align">
  <a class="board-list-title-icon"></a>
  <span>Your boards</span>
  </div>
  <ul class="board-list clean-list flex">
    <!-- <li v-for="board in boards" :key="board._id"> -->
      <board-preview v-for="board in boards" :key="board._id" :board="board" />
    <!-- </li> -->
  </ul>
</section>
</template>

<script>
import boardPreview from "./board-preview.vue";
export default {
  props: {
    boards: {
      type: Array,
    },
  },
  components: {
      boardPreview
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
  },
};
</script>

<style>
</style>