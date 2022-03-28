<template>
    <div class="header-board-list">
        <div class="header flex space-between align-center">
            <span class="title">Boards</span>
            <button class="close-btn btn" @click="onClose">x</button>
        </div>
        <ul class="board-list clean-list">
            <li class="board flex align-center" @click="goToBoard(board)" v-for="board in boards" :key="board._id">
                <div class="mini-pic" :style="{ backgroundImage: img(board) }"></div>
                <span>{{ board.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        boards: Array
    },
    emits: ['closeModal'],
    created() {
        console.log(this.boards);
    },
    methods: {
        goToBoard(board){
            console.log(board);
            this.$router.push(`/board/${board._id}`)
        },
        onClose() {
            this.$emit('closeModal')
        },
        img(board) {
            const url = new URL(`${board.style.imgUrl}`, import.meta.url).href
            return `url(${url})`
        },
    },
    computed: {

    }
}
</script>