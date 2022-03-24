<template>
  <section v-if="group" class="board-group">
    <h1>{{ group.title }}</h1>
    <ul class="clean-list">
      <li v-for="task in group.tasks" :key="task.id">
        <task-preview :task="task" />
      </li>
    </ul>
    <button v-if="!addBtnClicked" @click="openAddForm" class="add-card-btn"> + Add a card </button>
    <div v-else class="add-card-container">
        <form @submit.prevent="saveTask">
            <textarea ref="taskTitle" v-model="task.title" resize:none placeholder="Enter a title for this card..."/>
            <div>
            <button class="save-new-card-btn">Add card</button>
            <span class="close-add-btn" @click="addBtnClicked = !addBtnClicked">X</span>
            </div>
        </form>
    </div>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";
export default {
  props: {
    group: {
      type: Object,
    },
  },
  components: {
    taskPreview,
  },
  data() {
    return {
        addBtnClicked: false,
        task: {
            title: ''
        }
    };
  },
  created() {},
//   mounted() {},
  methods: {
    openAddForm(){
        this.addBtnClicked = !this.addBtnClicked
        console.log(this.$refs);
        this.$refs.taskTitle.focus();
  },
    async saveTask() {
        await this.$emit("saveTask", {
        groupId: this.group.id,
        task: { title: this.task.title },
      });
      this.task.title = ''
      this.addBtnClicked = !this.addBtnClicked   
    },
  },
  computed: {},
};
</script>

<style>
</style>