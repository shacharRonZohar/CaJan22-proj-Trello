<template>
    <section class="right-side-nav">
        <header class="flex space-between">
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
                <!-- <div class="img-result"> -->
                    <img @click="setBackGroundImg(result.urls.full)" :src="result.urls.thumb" alt="">
                <!-- </div> -->
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
        closeMenu(){
            this.$emit('closeMenu')
        }
    }
    
}
</script>