<template>
    <section class="right-side-nav">
        <ul>
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
            results: null
        }
    },
    created() {
        imgService.queryPhotos()
            .then(res => this.results = res.results)
    },
    
}
</script>