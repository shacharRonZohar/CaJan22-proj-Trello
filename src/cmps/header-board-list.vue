<template>
    <div class="header-board-list">
        <div class="header flex space-between align-center">
            <span class="title">Boards</span>
            <button class="close-btn btn" @click="onClose">
                <a class="close-board-list-icon"></a>
            </button>
        </div>
        <ul class="board-list clean-list">
            <li
                class="board flex align-center"
                @click="goToBoard(board)"
                v-for="board in boards"
                :key="board._id"
            >
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
        // console.log(this.boards);
    },
    methods: {
        goToBoard(board) {
            this.$router.push(`/board/${board._id}`)
            this.onClose()
        },
        onClose() {
            this.$emit('closeModal')
        },
        img(board) {
            return `url(${board.style?.imgUrl || ''})`
        },
    },
    computed: {

    }
}
</script>