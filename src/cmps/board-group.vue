<template>
  <section v-if="group" class="board-group">    
    <div class="group-header">
    <h1 @blur="onSaveTitle" class="title" contenteditable spellcheck="false">{{ group.title }}</h1>
    <button class="group-menu" @click="removeGroup">
    <a class="dots-icon" />
    </button>
    </div>
    <ul class="clean-list group-list">
      <li v-for="task in group.tasks" :key="task.id">
        <task-preview @openTaskDetails="openTaskDetails" :task="task" />
      </li>
    </ul>
    <button v-if="!addBtnClicked" @click="openAddForm" class="add-card-btn"> + Add a card </button>
    <div v-else class="add-card-container">
        <form @submit.prevent="saveTask">
            <textarea v-focus ref="taskTitle" v-model="task.title" resize:none placeholder="Enter a title for this card..."/>
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
        },
    };
  },
  created() {},
//   mounted() {},
  methods: {
    async onSaveTitle(ev) {
      this.group.title = ev.target.innerText
      this.$emit("editGroup", this.group)
      // await this.$store.dispatch({ type: 'saveTask', taskToSave: JSON.parse(JSON.stringify(this.task)), groupId: this.groupId })
      // this.task = await this.$store.dispatch({ type: 'getTaskById', taskId: this.task.id })
      console.log(this.group)
    },
    openAddForm(){
        this.addBtnClicked = !this.addBtnClicked
        console.log(this.$refs);
    },
    async saveTask() {
        await this.$emit("saveTask", {
        groupId: this.group.id,
        task: { title: this.task.title },
      });
      this.task.title = ''
      this.addBtnClicked = !this.addBtnClicked   
    },
    openTaskDetails(){
      this.$emit('openTaskDetails',this.group.id)
    },
    removeGroup(){
      this.$emit('removeGroup', this.group.id)
    }
  },
  computed: {},
};
</script>

<style>
</style>