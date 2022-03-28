<template>
  <section class="right-menu right-side-nav">
    <header class="flex space-between">
      <h1>Menu</h1>
      <a class="close-menu-icon" @click="closeMainMenu" />
    </header>
    <hr />
    <ul class="clean-list main-menu-list">
      <li @click="toggleMenu" class="flex main-list-item">
        <div
          class="board-icon-img"
          :style="{ backgroundImage: `url('${img}')`, backgroundColor: `${color}` }"
        ></div>
        <span> Change background </span>
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
export default {
  components: {
    backgroundMenu,
  },
  data() {
    return {
      showMenuClicked: false,
    };
  },
  async created() {},
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
  },
  computed: {
    isOpen() {
      return this.showMenuClicked ? "open" : "";
    },
    board() {
      return this.$store.getters.board;
    },
    img() {
      return this.board.style.imgUrl
        ? new URL(`${this.board.style.imgUrl}`, import.meta.url).href
        : "";
    },
    color() {
      return this.board.style.color
        ? this.board.style.color
        : "";
    },
  },
};
</script>