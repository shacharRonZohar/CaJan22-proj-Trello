<template>
  <section class="board-app flex" v-if="boards">
    <board-list-side-bar />
    <board-list :boards="boards" />
  </section>
</template>

<script>
import boardList from "../cmps/board-list.vue";
import boardListSideBar from "../cmps/board-list-side-bar.vue";
export default {
  components: {
    boardList,
    boardListSideBar,
  },
  created() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  unmounted() {},
};
</script>