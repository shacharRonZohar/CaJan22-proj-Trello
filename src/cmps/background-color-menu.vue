<template>
  <section class="right-menu background-color-menu">
    <header class="flex space-between">
      <a @click="goBack" class="back-menu-icon" />
      <h1>Colors</h1>
      <a class="close-menu-icon" @click="closeColorMenu" />
    </header>
    <hr />
    <!-- <form @submit.prevent="searchPhotos">
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
import { imgService } from "../services/imgService.js";

export default {
  data() {
    return {
      results: null,
      searchTxt: "",
    };
  },
  async created() {
    // const res = await imgService.queryPhotos()
    // this.results = res.results
  },
  methods: {
    async searchPhotos() {
      const res = await imgService.queryPhotos(this.searchTxt);
      this.results = res.results;
    },
    goBack(){
        this.$emit("goBack")
    },
    setBackGroundImg(imgUrl) {
      this.$emit("setBackGroundImg", imgUrl);
    },
    closeColorMenu() {
      this.$emit("closeColorMenu");
    },
  },
};
</script>