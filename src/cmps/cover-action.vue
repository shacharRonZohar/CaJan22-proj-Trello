<template >
    <div @click.stop class="cover-action btn">
        <!-- <div class="header">
            <span>Cover</span>
            <button class="close-action" @click="toggleActionPopup"></button>
        </div>-->
        <div class="body">
            <div @click.stop="onRemoveCover" v-if="task.cover" class="remove-cover">Remove cover</div>
            <div class="cover-clrs-container">
                <span>Colors</span>
                <ul class="clean-list cover-clrs">
                    <li
                        @click="onToggleCoverColor(color)"
                        class="cover-clr"
                        v-for="color in colors"
                        :key="color"
                        :style="{ backgroundColor: color }"
                        :class="isChosenColor(color)"
                    ></li>
                </ul>
            </div>
            <div class="attachments-container">
                <span>Attachments</span>
                <!-- TODO: Finish this -->
                <!-- <ul class="curr-attachments-list clean-list">
                    <li class="curr-attachment" v-for="attachment in task.attachments">
                        <img :src="attachment.url" alt />
                    </li>
                </ul>-->
                <button @click.stop for="file" class="btn upload-cover-img">
                    Upload a cover image
                    <input
                        id="file"
                        type="file"
                        @change.stop="onUploadImg"
                        @click.stop
                    />
                </button>
            </div>
            <div class="unsplash-photos-container">
                <span>Photos from Unsplash</span>
                <ul
                    class="clean-list imgs-container"
                    v-if="unsplashPhotos && unsplashPhotos.length"
                >
                    <li
                        @click.stop="onToggleCoverImg(photo.urls.full)"
                        class="img-container"
                        :class="isChosenImg(photo.urls.full)"
                        v-for="photo in unsplashPhotos"
                        :style="{ backgroundImage: `url(${photo.urls.thumb})` }"
                    ></li>
                </ul>
            </div>
        </div>
        <!-- <div class="chosen" v-if="isChosenColor(photo)"></div> -->
    </div>
</template>

<script>
import { imgService } from '../services/imgService.js'

export default {
    props: {
        task: Object
    },
    emits: ['action', 'actions', 'togglePopup'],
    async created() {
        const res = await imgService.queryPhotos()
        res.results.splice(6, res.results.length)
        this.unsplashPhotos = res.results
    },
    data() {
        return {
            colors: ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91'],
            unsplashPhotos: []
        }
    },
    methods: {
        onToggleCoverColor(color) {
            if (this.task?.cover?.backgroundColor === color) return this.onRemoveCover()
            this.$emit('action', { cbName: 'chooseCover', payload: { type: 'color', style: color } })
        },
        onToggleCoverImg(img) {
            // console.log(this.task?.cover?.backgroundImage === `url(${img})`)
            if (this.task?.cover?.backgroundImage === `url(${img})`) return this.onRemoveCover()
            // console.log(this.task?.cover?.backgroundImage === `url(${img})`)
            this.$emit('action', { cbName: 'chooseCover', payload: { type: 'img', style: img } })
        },
        onRemoveCover() {
            // console.log('here')
            this.$emit('action', { cbName: 'removeCover' })
        },
        async onUploadImg(ev) {
            const img = await imgService.uploadImgFromComp(ev)
            const actions = [
                { cbName: 'uploadAttachment', payload: img.url },
                { cbName: 'chooseCover', payload: { type: 'img', style: img.url } }
            ]
            this.$emit('actions', actions)
            // this.onChooseCoverImg(img.url)
        },
        toggleActionPopup() {
            this.$emit('togglePopup')
        },
        isChosenColor(color) {
            return { 'chosen': this.task.cover?.backgroundColor === color }
        },
        isChosenImg(img) {
            return { 'chosen': this.task.cover?.backgroundImage === `url(${img})` }
        }
    },
    unmounted() { },
}
</script>