<template>
  <section class="right-menu right-side-nav">
    <header class="flex space-between">
      <h1>Menu</h1>
      <a class="close-menu-icon" @click="closeMainMenu" />
    </header>
    <hr />
    <ul class="clean-list main-menu-list">
      <li class="flex main-list-item">
        <div class="board-icon">
          <a class="about-board-icon" />
        </div>
        <span>About this board</span>
      </li>
      <li @click="toggleMenu" class="flex background-list-item">
        <div
          class="board-icon-img"
          :style="{ backgroundImage: `url('${img}')`, backgroundColor: `${color}` }"
        ></div>
        <span>Change background</span>
      </li>
      <li class="flex main-list-item">
        <div class="board-icon">
          <a class="dashboard-icon" />
        </div>
        <span>Dashboard</span>
      </li>
      <hr />
      <li class="flex activity-list-item">
        <div class="board-icon">
          <a class="activity-board-icon" />
        </div>
        <span class="board-activity-title">Activity</span>
        <ul>
          <li v-for="activity in board.activities" :key="activity.id">{{ getActivityTxt(activity) }}</li>
        </ul>
      </li>
    </ul>
    <background-menu
      @closeBgMenu="closeBgMenu"
      @goBack="toggleMenu"
      @setBackGroundImg="setBackGroundImg"
      @setBackGroundColor="setBackGroundColor"
      :class="isOpen"
    />
  </section>
</template>

<script>
import backgroundMenu from "./background-menu.vue"
export default {
  components: {
    backgroundMenu,
  },
  data() {
    return {
      showMenuClicked: false,
    }
  },
  methods: {
    toggleMenu() {
      this.showMenuClicked = !this.showMenuClicked
    },
    closeMainMenu() {
      this.$emit("closeMenu")
    },
    closeBgMenu() {
      this.showMenuClicked = !this.showMenuClicked
      this.$emit("closeMenu")
    },
    setBackGroundImg(imgUrl) {
      this.$emit("setBackGroundImg", imgUrl)
    },
    setBackGroundColor(color) {
      this.$emit("setBackGroundColor", color)
    },
    getActivityTxt(activity) {
      let txt = `${activity.user?.fullname} ${activity.type} `
      if (activity.type === 'renamed') return txt += 'this board'
      return txt += `${activity.itemName} ${activity.type === 'added' ? 'to' : 'from'} ${activity.containerName}`
    }
  },
  computed: {
    isOpen() {
      return this.showMenuClicked ? "open" : ""
    },
    board() {
      return this.$store.getters.board
    },
    img() {
      return this.board.style?.imgUrl || ''
    },
    color() {
      return this.board.style.color
        ? this.board.style.color
        : ""
    },
  },
}
</script>