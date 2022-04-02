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
          :style="{
            backgroundImage: `url('${img}')`,
            backgroundColor: `${color}`,
          }"
        ></div>
        <span>Change background</span>
      </li>
      <li class="flex main-list-item" @click="openDashboard">
        <div class="board-icon">
          <a class="dashboard-icon" />
        </div>
        <span>Dashboard</span>
      </li>
      <hr />
      <li class="activity-list-item">
        <div class="flex board-activities-header">
          <div class="board-icon">
            <a class="activity-board-icon" />
          </div>
          <span class="board-activity-title">Activity</span>
        </div>
        <ul class="clean-list">
          <li
            class="activity-container"
            v-for="activity in board.activities"
            :key="activity.id"
          >
            <span
              @click="print(activity)"
              class="user-img"
              :style="{ backgroundImage: `url(${activity.user.imgUrl})` }"
            />
            <span class="activity-txt"
              ><span class="activity-txt-username">{{
                activity.user.fullname
              }}</span
              >{{ getActivityTxt(activity) }}</span
            >
            <div class="activity-time">{{getTime(activity.createdAt)}}</div>
          </li>
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
import backgroundMenu from "./background-menu.vue";
import { activityService } from "../services/activity.service.js";
import moment from "moment"

export default {
  components: {
    backgroundMenu,
  },
  data() {
    return {
      showMenuClicked: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenuClicked = !this.showMenuClicked;
    },
    closeMainMenu() {
      this.$emit("closeMenu");
    },
    closeBgMenu() {
      this.showMenuClicked = !this.showMenuClicked;
      this.$emit("closeMenu");
    },
    setBackGroundImg(imgUrl) {
      this.$emit("setBackGroundImg", imgUrl);
    },
    setBackGroundColor(color) {
      this.$emit("setBackGroundColor", color);
    },
    getActivityTxt(activity) {
      return activityService.getActivityTxt(activity, "board");
    },
    openDashboard() {
      this.closeMainMenu();
      this.$router.push("/board/" + this.board._id + "/dashboard");
    },
    print(act) {
      console.log(act);
    },
    getTime(date) {
      // console.log(date)
      return moment(+date).fromNow()
    },
  },
  computed: {
    isOpen() {
      return this.showMenuClicked ? "open" : "";
    },
    board() {
      return this.$store.getters.board;
    },
    img() {
      return this.board.style?.imgUrl || "";
    },
    color() {
      return this.board.style.color ? this.board.style.color : "";
    },
  },
};
</script>