<template>
  <section v-if="board" class="board-details" :style="{backgroundImage: `url(${img})`}">
    <board-header :board="board"/>
    <main class="main-board">
    <ul class="flex clean-list">
      <li v-for="group in board.groups" :key="group.id">
        <board-group class="draggable-item" :group="group" @editGroup="saveGroup" @saveTask="saveTask" @openTaskDetails="openTaskDetails" @removeGroup="removeGroup" />
      </li>
      <button v-if="!addBtnClicked" @click="addBtnClicked = !addBtnClicked" class="add-group-btn"><span>+</span> Add another list</button>
       <div v-else class="add-group-container">
        <form @submit.prevent="addGroup">
            <textarea v-focus v-model="group.title" resize:none placeholder="Enter list title..."/>
            <button class="save-new-list-btn">Add list</button>
            <span class="close-add-btn" @click="addBtnClicked = !addBtnClicked">X</span>
        </form>
    </div>
    </ul>
    <router-view :groupId="currOpenTaskGroupId" />
    </main>
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
      addBtnClicked: false,
      group: {
          title: ''
      },
      currOpenTaskGroupId: null
    };
  },
  created() {
  },
  methods: {
    async saveTask({ groupId, task }) {
      await this.$store.dispatch({
        type: "saveTask",
        taskToSave: task,
        groupId,
        activity: "Add a new card",
      });
    },
    async addGroup() {
      await this.$store.dispatch({
        type: "saveGroup",
        groupToSave: {title: this.group.title},
        activity: "Add a new group",
      });
      this.group.title = ''
      this.addBtnClicked = !this.addBtnClicked
    },
    async saveGroup(groupToSave) {
      await this.$store.dispatch({
        type: "saveGroup",
        groupToSave,
        activity: "edit a group",
      });
    },
    openTaskDetails(groupId){
      this.currOpenTaskGroupId = groupId
    },
    async removeGroup(groupId){
       if (confirm("Sure to delete?")) {
         await this.$store.dispatch({ 
           type: "removeGroup", 
           groupId,
           activity: "Remove group"
         });
      } else return
    }
  },
  computed: {
    boardId() {
      return this.$route.params.boardId;
    },
    board(){
      return this.$store.getters.board;
    },
    img() {
      return new URL(`${this.board.style.imgUrl}`, import.meta.url).href
    }
  },
  unmounted() {},
  watch: {
    boardId: {
      handler() {
        const { boardId } = this.$route.params;
        this.$store.commit({ type: "setBoard", boardId });
      },
      immediate: true,
    },
  },
};
</script>