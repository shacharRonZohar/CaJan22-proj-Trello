<template >
    <div @click.stop class="cover-action btn">
        <div class="header">
            <span>Cover</span>
            <button class="close-action" @click="toggleActionPopup"></button>
        </div>
        <div @click.stop="onRemoveCover" v-if="chosenColor" class="remove-cover">Remove cover</div>
        <ul class="clean-list cover-clrs">
            <li
                @click="onChooseCoverColor(color)"
                v-for="color in colors"
                :key="color"
                :style="{ backgroundColor: color }"
            >
                <div class="chosen" v-if="isChosenColor(color)"></div>
            </li>
        </ul>
        <label @click.stop for="file" class="computer body">
            Computer
            <input id="file" type="file" @change.stop="onUploadImg" @click.stop />
        </label>
        <span>Photos from Unsplash</span>
        <ul class="clean-list imgs-container" v-if="unsplashPhotos && unsplashPhotos.length">
            <li
                @click.stop="onChooseCoverImg(photo.urls.full)"
                class="img-container"
                v-for="photo in unsplashPhotos"
            >
                <img :src="photo.urls.thumb" alt />
            </li>
        </ul>
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
            chosenColor: '',
            unsplashPhotos: []
        }
    },
    methods: {
        onChooseCoverColor(color) {
            this.$emit('action', { cbName: 'chooseCover', payload: { type: 'color', style: color } })
            this.chosenColor = color
        },
        onChooseCoverImg(img) {
            this.$emit('action', { cbName: 'chooseCover', payload: { type: 'img', style: img } })
            // this.$emit('onAction', { cbName: 'uploadAttachment', payload: { type: 'img', style: img } })
        },
        onRemoveCover() {
            this.$emit('action', { cbName: 'removeCover' })
            this.chosenColor = ''
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
            return this.chosenColor === color
        }
    },
    unmounted() { },
}
</script>