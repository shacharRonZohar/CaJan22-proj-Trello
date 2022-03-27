<template>
    <section class="add-board">
        <div class="header">
            <span>Back </span>
            <span>Create board</span>
            <span> X</span>
            <hr>
        </div>

        <div class="body">
            <span>Background</span>
            <ul class="img-list clean-list flex">
                <li v-for="img in imgs" :key="img.id">
                    <img @click="setBackgroundImg(img)" :src="img.urls.thumb" alt />
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
            <input v-model="boardToAdd.title" type="text" />
            <button @click="onCreateBoard">Create</button>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board.service.js'
import { imgService } from '../services/imgService.js'


export default {
    emits: ['addedBoard'],
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
            console.log(res.results.splice(1, 4));
            this.imgs = res.results.splice(1, 4)
        },
        setBackgroundImg(img) {
            console.log(img);
            this.boardToAdd.style.imgUrl = img.urls.full
            this.boardToAdd.style.color = ''
        },
        setBackgroundColor(color) {
            console.log(color);
            this.boardToAdd.style.color = color
            this.boardToAdd.style.imgUrl = ''
        },
        onCreateBoard() {
            console.log('creating - ', this.boardToAdd);
            this.$store.dispatch({type: 'saveBoard', boardToSave: this.boardToAdd})
            this.$emit('addedBoard')
        }
    },
}
</script>