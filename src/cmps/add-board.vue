<template>
    <section class="add-board">
        <div class="header flex">
            <span class="back-btn" @click="onBack">B</span>
            <span class="title">Create board</span>
            <span class="exit-btn" @click="onClose">X</span>
        </div>

        <div class="body">
            <hr>
            <div class="bg-panel">
                <span class="background-title">Background</span>
                <ul class="img-list clean-list flex">
                    <li v-for="img in imgs" :key="img.id">
                        <img class="img" @click="setBackgroundImg(img)" :src="img.urls.thumb" alt>
                    </li>
                </ul>
                <ul class="color-list clean-list flex">
                    <li v-for="color in colors" :key="color">
                        <div 
                        class="color" 
                        @click="setBackgroundColor(color)" 
                        :style="{backgroundColor: color}">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="input-panel">
                <span class="input-title">Board title <span class="asterisk">*</span></span>
                <input v-model="boardToAdd.title" type="text" />
            </div>
            <button class="create-btn btn" @click="onCreateBoard">Create</button>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board.service.js'
import { imgService } from '../services/imgService.js'


export default {
    emits: ['addedBoard', 'closeModal'],
    data() {
        return {
            boardToAdd: boardService.getEmptyBoard(),
            imgs: null,
            colors: ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e']
        }
    },
    created() {
        this.displayImgs()
    },
    methods: {
        async displayImgs() {
            const res = await imgService.queryPhotos(this.searchTxt)
            this.imgs = res.results.splice(1, 4)
        },
        setBackgroundImg(img) {
            this.boardToAdd.style.imgUrl = img.urls.full
            this.boardToAdd.style.color = ''
        },
        setBackgroundColor(color) {
            this.boardToAdd.style.color = color
            this.boardToAdd.style.imgUrl = ''
        },
        onCreateBoard() {
            if (this.boardToAdd.title.trim() === '') return
            this.$store.dispatch({type: 'saveBoard', boardToSave: this.boardToAdd})
            this.$emit('addedBoard')
        },
        onClose() {
            this.$emit('addedBoard')
        }
    },
}
</script>