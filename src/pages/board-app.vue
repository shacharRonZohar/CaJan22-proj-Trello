<template>
    <section class="board-app flex" v-if="boards">
        <div class="board-list-side-bar">
            <ul class="clean-list">
                <li>
                    <a href="boards-menu-icon" /><span>Boards</span>
                </li>
                <li>
                    <a href="templates-menu-icon" /><span>Templates</span>
                </li>
                <li>
                    <a href="Home-menu-icon" /><span>Home</span>
                </li>
            </ul>
        </div>
        <div class="board-list flex">
            <ul class="clean-list" v-for="board in boards" :key="board._id">
                <li>
                    <!-- <div :style="{ backgroundImage: `url(${img})` }"> -->
                    <pre>{{board}}</pre>
                    <!-- </div> -->
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    components: {},
    created() {},
    data() {
        return {}
    },
    methods: {},
    computed: {
        boards(){
            return this.$store.getters.boards
        },
         img() {
            return new URL(`${this.board.style.imgUrl}`, import.meta.url).href
    }
    },
    unmounted() { },
}
</script>