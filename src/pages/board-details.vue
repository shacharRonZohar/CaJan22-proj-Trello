<template>
  <section class="board-details">
    <board-header />
    <ul class="flex clean-list">
      <li v-for="group in board.groups" :key="group.id">
        <board-group :group="group" @saveTask="saveTask"></board-group>
      </li>
    </ul>
    <router-view />
  </section>
</template>

<script>
import boardGroup from "../cmps/board-group.vue";
import boardHeader from "../cmps/board-header.vue";
export default {
  components: {
    boardGroup,
    boardHeader,
  },
  data() {
    return {
      board: null,
    };
  },
  created() {},
  methods: {
    async saveTask({ groupId, task }) {
      await this.$store.dispatch({
        type: "saveTask",
        taskToSave: task,
        groupId,
        activity: "Add a new card",
      });
      this.board = this.$store.getters.board;
    },
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
  },
  unmounted() {},
  watch: {
    boardId: {
      handler() {
        const { boardId } = this.$route.params;
        this.$store.commit({ type: "setBoard", boardId });
        this.board = this.$store.getters.board;
      },
      immediate: true,
    },
  },
};
</script>