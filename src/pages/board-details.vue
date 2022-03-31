<template>
  <section
    v-if="board"
    class="board-details"
    :style="{ backgroundImage: `url('${img}')`, backgroundColor: `${color}` }"
  >
    <board-header @openMenu="toggleMenu" :board="board" />
    <main class="main-board" :class="shownLabels">
      <Container
        drag-class="on-dragging"
        @drop="onDrop"
        orientation="horizontal"
        class="flex clean-list"
      >
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
            @labelClicked="labelClicked"
            @dateChecked="dateChecked"
          />
        </Draggable>
        <button v-if="!addBtnClicked" @click="addBtnClicked = !addBtnClicked" class="add-group-btn">
          <span>+</span> Add another list
        </button>
        <div v-else class="add-group-container">
          <form @submit.prevent="addGroup" class="add-group-form">
            <textarea v-focus v-model="group.title" resize:none placeholder="Enter list title..." />
            <button class="save-new-list-btn">Add list</button>
            <span class="close-add-btn" @click="addBtnClicked = !addBtnClicked"></span>
          </form>
        </div>
      </Container>
      <router-view :groupId="currOpenTaskGroupId" />
      <right-nav
        :class="isOpen"
        @closeMenu="toggleMenu"
        @setBackGroundImg="setBackGroundImg"
        @setBackGroundColor="setBackGroundColor"
      ></right-nav>
    </main>
  </section>
</template>

<script>
import boardGroup from "../cmps/board-group.vue"
import boardHeader from "../cmps/board-header.vue"
import rightNav from "../cmps/right-side-nav.vue"
import { socketService } from '../services/socket.service.js'
import { Container, Draggable } from "vue3-smooth-dnd"

export default {
  components: {
    boardGroup,
    boardHeader,
    rightNav,
    Container,
    Draggable,
  },
  data() {
    return {
      addBtnClicked: false,
      group: {
        title: "",
      },
      currOpenTaskGroupId: null,
      showMenuClicked: false,
      isLabelClicked: false,
    }
  },
  created() { },
  methods: {
    saveTaskDrop({ ev, groupId }) {
      if (ev.removedIndex !== null) {
        const board = JSON.parse(JSON.stringify(this.board))
        const group = board.groups.find((group) => group.id === groupId)
        group.tasks.splice(ev.removedIndex, 1)
        this.$store.dispatch({ type: "saveBoard", boardToSave: board })
      }
      if (ev.addedIndex !== null) {
        setTimeout(() => {
          const board = JSON.parse(JSON.stringify(this.board))
          const group = board.groups.find((group) => group.id === groupId)
          group.tasks.splice(ev.addedIndex, 0, ev.payload)
          this.$store.dispatch({ type: "saveBoard", boardToSave: board })
        }, 500)
      }
    },
    async onDrop({ removedIndex, addedIndex }) {
      this.$store.dispatch({
        type: "saveGroupDrop",
        fromIdx: removedIndex,
        toIdx: addedIndex,
      })
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
      if (this.group.title.trim() === "") return
      await this.$store.dispatch({
        type: "saveGroup",
        groupToSave: { title: this.group.title },
        activity: "Add a new group",
      })
      this.group.title = ""
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
        await this.$store.dispatch({
          type: "removeGroup",
          groupId,
          activity: "Remove group",
        })
    },
    toggleMenu() {
      this.showMenuClicked = !this.showMenuClicked
    },
    async setBackGroundImg(imgUrl) {
      await this.$store.dispatch({
        type: "setBackGroundImg",
        imgUrl,
        activity: "Change background image",
      })
    },
    async setBackGroundColor(color) {
      await this.$store.dispatch({
        type: "setBackGroundColor",
        color,
        activity: "Change background color",
      })
    },
    labelClicked() {
      this.isLabelClicked = !this.isLabelClicked
    },
    async dateChecked(taskId, groupId){
      await this.$store.dispatch({
        type: "toggleTaskDone",
        taskId,
        groupId,
        payload: taskId,
      })
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
      return this.board.style.imgUrl
        ? new URL(`${this.board.style.imgUrl}`, import.meta.url).href
        : ""
    },
    color() {
      return this.board.style.color
        ? this.board.style.color
        : ""
    },
    isOpen() {
      return this.showMenuClicked ? "open" : ""
    },
    dragClass() {
      return {}
    },
    shownLabels() {
      return this.isLabelClicked ? "show-title" : "hide-title"
    },
  },
  watch: {
    boardId: {
      handler() {
        const { boardId } = this.$route.params
        socketService.setup()
        socketService.emit('watch-board', boardId)
        socketService.on('board-update', board => {
          this.$store.dispatch({ type: 'saveBoard', boardToSave: board, isFromSocket: true })
        })
        this.$store.commit({ type: "setBoard", boardId })
      },
      immediate: true,
    },
  },
}
</script>

<style>
.on-dragging {
  transform: rotate(5deg);
}
</style>