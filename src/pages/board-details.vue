<template>
  <section v-if="board" class="board-details" :style="{ backgroundImage: `url(${img})` }">
    <board-header :board="board" />
    <main class="main-board">
      <Container @drop="onDrop" orientation="horizontal" class="flex clean-list">
        <!-- :get-child-payload="() => group.id" -->
        <Draggable v-for="group in board.groups" :key="group.id">
          <board-group
            @saveTaskDrop="saveTaskDrop"
            class="draggable-item"
            :group="group"
            @editGroup="saveGroup"
            @saveTask="saveTask"
            @openTaskDetails="openTaskDetails"
            @removeGroup="removeGroup"
          />
        </Draggable>
        <button v-if="!addBtnClicked" @click="addBtnClicked = !addBtnClicked" class="add-group-btn">
          <span>+</span> Add another list
        </button>
        <div v-else class="add-group-container">
          <form @submit.prevent="addGroup">
            <textarea v-focus v-model="group.title" resize:none placeholder="Enter list title..." />
            <button class="save-new-list-btn">Add list</button>
            <span class="close-add-btn" @click="addBtnClicked = !addBtnClicked">X</span>
          </form>
        </div>
      </Container>
      <router-view :groupId="currOpenTaskGroupId" />
    </main>
  </section>
</template>

<script>
import boardGroup from '../cmps/board-group.vue'
import boardHeader from '../cmps/board-header.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  components: {
    boardGroup,
    boardHeader,
    Container,
    Draggable
  },
  data() {
    return {
      addBtnClicked: false,
      group: {
        title: ''
      },
      currOpenTaskGroupId: null
    }
  },
  created() {
  },
  methods: {
    async saveTaskDrop({ ev, groupId }) {
      if (ev.removedIndex !== null && ev.addedIndex !== null) {
        const board = JSON.parse(JSON.stringify(this.board))
        console.log('Ive been here once')
        let group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.splice(ev.removedIndex, 1)[0]
        group.tasks.splice(ev.addedIndex, 0, task)
        console.log(group)
        this.$store.dispatch({ type: 'saveBoard', boardToSave: board })
      }
      else if (ev.removedIndex !== null) {
        const board = JSON.parse(JSON.stringify(this.board))
        const group = board.groups.find(group => group.id === groupId)
        ev.payload = group.tasks.splice(ev.removedIndex, 1)[0]
        await this.$store.dispatch({ type: 'saveBoard', boardToSave: board })
      }
      else if (ev.addedIndex !== null) {
        setTimeout(() => {
          const board = JSON.parse(JSON.stringify(this.board))
          const group = board.groups.find(group => group.id === groupId)
          group.tasks.splice(ev.addedIndex, 0, ev.payload)
          this.$store.dispatch({ type: 'saveBoard', boardToSave: board })
        }, 10)
      }

    },
    async onDrop({ removedIndex, addedIndex }) {
      this.$store.dispatch({ type: 'saveGroupDrop', fromIdx: removedIndex, toIdx: addedIndex })
      // const group = board.groups.splice(ev.removedIndex, 1)[0]
      // board.groups.splice(ev.addedIndex, 0, group)
      // await this.$store.dispatch({ type: 'saveBoard', boardToSave: board })
      // this.$store.commit({ type: 'setBoard', boardId: board._id })
    },
    async saveTask({ groupId, task }) {
      await this.$store.dispatch({
        type: "saveTask",
        taskToSave: task,
        groupId,
        activity: "Add a new card",
      })
    },
    async addGroup() {
      await this.$store.dispatch({
        type: "saveGroup",
        groupToSave: { title: this.group.title },
        activity: "Add a new group",
      })
      this.group.title = ''
      this.addBtnClicked = !this.addBtnClicked
    },
    async saveGroup(groupToSave) {
      await this.$store.dispatch({
        type: "saveGroup",
        groupToSave,
        activity: "edit a group",
      })
    },
    openTaskDetails(groupId) {
      this.currOpenTaskGroupId = groupId
    },
    async removeGroup(groupId) {
      if (confirm("Sure to delete?")) {
        await this.$store.dispatch({
          type: "removeGroup",
          groupId,
          activity: "Remove group"
        })
      } else return
    }
  },
  computed: {
    boardId() {
      return this.$route.params.boardId
    },
    board() {
      return this.$store.getters.board
    },
    img() {
      return new URL(`${this.board.style.imgUrl}`, import.meta.url).href
    }
  },
  unmounted() { },
  watch: {
    boardId: {
      handler() {
        const { boardId } = this.$route.params
        this.$store.commit({ type: "setBoard", boardId })
      },
      immediate: true,
    },
  },
}
</script>