<template>
    <div class="header-board-list">
        <span>Boards</span>
        <button class="btn" @click="onClose">x</button>
        <ul class="board-list clean-list">
            <li @click="goToBoard(board)" v-for="board in boards" :key="board._id">
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

<style>
.header-board-list {
    border: 1px solid black;
    padding: 10px;
    position: absolute;
    z-index: 1;
    top: 50px;
    background-color: #fff;
}
.mini-pic {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-size: cover;
}
</style>