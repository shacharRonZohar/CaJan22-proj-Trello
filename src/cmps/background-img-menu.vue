<template>
  <section class="right-menu background-img-menu">
  <header class="flex space-between">
        <a @click="goBack" class="back-menu-icon" />
        <h1>Photos by <span><a target="_blank" href="https://unsplash.com/">Unsplah</a></span></h1>
         <a class="close-menu-icon" @click="closeImgMenu" />
        </header>
        <hr />
        <form class="search-bg-img-form" @submit.prevent="searchPhotos">
            <input v-model="searchTxt" type="search" />
            <button>Search</button>
        </form>
        <ul class="clean-list flex unsplash-imgs-results">
            <li v-for="result in results" :key="result.id">
                    <div class="right-menu-unsplash-img" 
                    @click="setBackGroundImg(result.urls.full)"
                    :style="{ backgroundImage: `url(${result.urls.thumb})` }">
                    <div class="right-menu-unsplash-title">title</div>
                    </div>
            </li>
        </ul>
  </section>
</template>

<script>
import { imgService } from '../services/imgService.js'

export default {
  data() {
    return {
        results: null,
        searchTxt: ''
    }
  },
  async created() {
      // const res = await imgService.queryPhotos()
      // this.results = res.results
  },
  methods: {
      async searchPhotos() {
          const res = await imgService.queryPhotos(this.searchTxt)
          this.results = res.results
      },
      setBackGroundImg(imgUrl){
          this.$emit('setBackGroundImg', imgUrl)
      },
      closeImgMenu(){
          this.$emit('closeImgMenu')
      },
      goBack(){
        this.$emit("goBack")
    },
  }
};
</script>