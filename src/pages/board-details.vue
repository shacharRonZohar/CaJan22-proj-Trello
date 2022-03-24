<template>
  <section class="board-details">
    <board-header />
    <ul class="flex clean-list">
      <li v-for="group in board.groups" :key="group.id">
        <board-group :group="group" @saveTask="saveTask"></board-group>
      </li>
      <button v-if="!addBtnClicked" @click="addBtnClicked = !addBtnClicked" class="add-group-btn"><span>+</span> Add another list</button>
       <div v-else class="add-group-container">
        <form @submit.prevent="saveGroup">
            <textarea v-model="group.title" resize:none placeholder="Enter list title..."/>
            <button class="save-new-list-btn">Add list</button>
            <span class="close-add-btn" @click="addBtnClicked = !addBtnClicked">X</span>
        </form>
    </div>
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
      addBtnClicked: false,
      group: {
          title: ''
      }
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
    async saveGroup() {
      await this.$store.dispatch({
        type: "saveGroup",
        groupToSave: {title: this.group.title},
        activity: "Add a new card",
      });
      this.board = this.$store.getters.board;
      this.group.title = ''
      this.addBtnClicked = !this.addBtnClicked
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