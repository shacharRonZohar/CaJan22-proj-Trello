<template>
  <section v-if="group" class="board-group">
    <div class="group-header">
      <h1 @blur="onSaveTitle" class="group-title" contenteditable spellcheck="false">{{ group.title }}</h1>
      <button class="group-menu" @click="removeGroup">
        <a class="dots-icon" />
      </button>
    </div>
    <!-- <Container :group-name="'group1'"></Container> -->
    <div class="tasks-container" v-if="group.tasks?.length">
      <Container
        drag-class="on-dragging"
        :get-child-payload="(ev) => getTaskPayload(ev)"
        :group-name="'group'"
        @drop="onDrop"
        orientation="vertical"
        class="clean-list group-list"
      >
        <Draggable v-for="task in group.tasks" :key="task.id">
          <task-preview @openTaskDetails="openTaskDetails" @labelClicked="labelClicked" :task="task" />
        </Draggable>
      </Container>
    </div>
    <button v-if="!addBtnClicked" @click="openAddForm" class="add-card-btn">
      <a class="add-card-icon" />
      Add a card
      </button>
    <div v-else class="add-card-container">
      <form @submit.prevent="saveTask">
        <textarea
          v-focus
          ref="taskTitle"
          v-model="task.title"
          resize:none
          placeholder="Enter a title for this card..."
        />
        <div>
          <button class="save-new-card-btn">
            Add card
            </button>
          <span class="close-add-btn" @click="addBtnClicked = !addBtnClicked">X</span>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue"
import { Container, Draggable } from 'vue3-smooth-dnd'
export default {
  props: {
    group: {
      type: Object,
    },
  },
  components: {
    taskPreview,
    Container,
    Draggable
  },
  data() {
    return {
      addBtnClicked: false,
      task: {
        title: ''
      },
    }
  },
  created() { },
  //   mounted() {},
  methods: {
    getTaskPayload(index) {
      return this.group.tasks[index]
    },
    onDrop(ev) {
      this.$emit('saveTaskDrop', { ev, groupId: this.group.id })
    },
    async onSaveTitle(ev) {
      if (!ev.target.innerText) return
      this.group.title = ev.target.innerText
      this.$emit('editGroup', this.group)
    },
    openAddForm() {
      this.addBtnClicked = !this.addBtnClicked
      console.log(this.$refs)
    },
    async saveTask() {
      await this.$emit('saveTask', {
        groupId: this.group.id,
        task: { title: this.task.title },
      })
      this.task.title = ''
      this.addBtnClicked = !this.addBtnClicked
    },
    openTaskDetails() {
      this.$emit('openTaskDetails', this.group.id)
    },
    removeGroup() {
      this.$emit('removeGroup', this.group.id)
    },
    labelClicked(){
      this.$emit('labelClicked')
    }
  },
  computed: {},
}
</script>

<style>
.on-dragging {
  transform: rotate(5deg);
}
</style>