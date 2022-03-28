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
                <label @click.stop for="file" class="computer body">
                    Computer
                    <input id="file" type="file" @change.stop="onUploadImg" @click.stop />
                </label>
            </div>
        </div>
        <!--<span>Photos from Unsplash</span>
        <ul class="clean-list imgs-container" v-if="unsplashPhotos && unsplashPhotos.length">
            <li
                @click.stop="onToggleCoverImg(photo.urls.full)"
                class="img-container"
                v-for="photo in unsplashPhotos"
            >
                <img :src="photo.urls.thumb" alt />
            </li>
        </ul>-->
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
        this.unsplashPhotos = res.results
    },
    data() {
        return {
            colors: ['yellow', 'red', 'pink', 'orange', 'green', 'blue', 'lightblue'],
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
            console.log(this.task?.cover?.backgroundImage === `url(${img})`)
            this.$emit('action', { cbName: 'chooseCover', payload: { type: 'img', style: img } })
        },
        onRemoveCover() {
            console.log('here')
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
            return this.task.cover?.backgroundImage === `url(${img})`
        }
    },
    unmounted() { },
}
</script>