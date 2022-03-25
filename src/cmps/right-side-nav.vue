<template>
    <section class="right-side-nav">
        <form @submit.prevent="searchPhotos">
            <input v-model="searchTxt" type="text">
            <button>Search</button>
        </form>
        <ul class="clean-list">
            <li v-for="result in results" :key="result.id">
                <div class="img">
                    <img :src="result.urls.thumb" alt="">
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
    created() {
        imgService.queryPhotos()
            .then(res => this.results = res.results)
    },
    methods: {
        searchPhotos() {
            imgService.queryPhotos(this.searchTxt)
                .then(res => this.results = res.results)
        }
    }
    
}
</script>