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
                    <board-list :board="board" />
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import boardList from "../cmps/board-list.vue"
export default {
    components: {
        boardList
    },
    created() {},
    data() {
        return {

        }
    },
    methods: {},
    computed: {
        boards(){
            return this.$store.getters.boards
        },
    },
    unmounted() { },
}
</script>