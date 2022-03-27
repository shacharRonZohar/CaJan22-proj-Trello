<template>
  <section class="right-side-nav">
    <header class="flex space-between">
      <h1>Menu</h1>
      <div @click="closeMenu">X</div>
    </header>
    <hr />
    <ul class="clean-list">
      <li @click="openMenu()" class="flex">
        <div></div>
        Change background
      </li>
    </ul>
    <change-background-menu :class="isMenuOpen" />

    <!-- <header class="flex space-between">
        <h1>Photos by <span><a target="_blank" href="https://unsplash.com/">Unsplah</a></span></h1>
        <div @click="closeMenu">X</div>
        </header>
        <hr />
        <form @submit.prevent="searchPhotos">
            <input v-model="searchTxt" type="search" />
            <button>Search</button>
        </form>
        <ul class="clean-list flex">
            <li v-for="result in results" :key="result.id">
                    <img @click="setBackGroundImg(result.urls.full)" :src="result.urls.thumb" alt="">
            </li>
        </ul> -->
  </section>
</template>

<script>
import changeBackgroundMenu from "./change-background-menu.vue";
export default {
  components: {
    changeBackgroundMenu,
  },
  data() {
    return {};
  },
  async created() {},
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
    },
  },
};
</script>