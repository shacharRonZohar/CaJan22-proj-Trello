<template>
  <section class="right-menu background-menu">
    <header class="flex space-between">
      <a @click="goBack" class="back-menu-icon" />
      <h1>Change background</h1>
      <a class="close-menu-icon" @click="closeBgMenu" />
    </header>
    <hr />
    <main class="bg-menu-main">
      <ul class="clean-list flex">
        <li @click="toggleImgMenu">
          <div class="bg-menu-imgs bg-photos-img" />
          <div class="bg-menu-imgs-title">photos</div>
        </li>
        <li @click="toggleColorMenu">
          <div class="bg-menu-imgs bg-colors-img" />
          <div class="bg-menu-imgs-title">Colors</div>
        </li>
      </ul>
    </main>

    <background-img-menu
      @closeImgMenu="closeImgMenu"
      @goBack="toggleImgMenu"
      @setBackGroundImg="setBackGroundImg"
      :class="isImgOpen"
    />
    <background-color-menu
      @closeColorMenu="closeColorMenu"
      @setBackGroundColor="setBackGroundColor"
      @goBack="toggleColorMenu"
      :class="isColorOpen"
    />
  </section>
</template>

<script>
import backgroundImgMenu from "./background-img-menu.vue";
import backgroundColorMenu from "./background-color-menu.vue";

export default {
  components: {
    backgroundImgMenu,
    backgroundColorMenu,
  },
  data() {
    return {
      showImgClicked: false,
      showColorClicked: false,
    };
  },
  async created() {},
  methods: {
    toggleImgMenu() {
      this.showImgClicked = !this.showImgClicked;
    },
    toggleColorMenu() {
      this.showColorClicked = !this.showColorClicked;
    },
    closeImgMenu() {
      this.showImgClicked = !this.showImgClicked;
      this.$emit("closeBgMenu");
    },
    closeColorMenu() {
      this.showColorClicked = !this.showColorClicked;
      this.$emit("closeBgMenu");
    },
    closeBgMenu() {
      this.$emit("closeBgMenu");
    },
    goBack() {
      this.$emit("goBack");
    },
    setBackGroundImg(imgUrl) {
      this.$emit("setBackGroundImg", imgUrl);
    },
    setBackGroundColor(color) {
      this.$emit("setBackGroundColor", color);
    },
  },
  computed: {
    isImgOpen() {
      return this.showImgClicked ? "open" : "";
    },
    isColorOpen() {
      return this.showColorClicked ? "open" : "";
    },
  },
};
</script>