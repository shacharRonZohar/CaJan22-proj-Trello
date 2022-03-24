<template>
    <header :class="headerBgc" class="main-header app-header flex align-center">
        <div class="logo">Twello</div>

        <div class="board-main-nav flex space-between align-center">
            <div class="actions">
                <button class="btn">Board</button>
                <button class="btn">Starred</button>

                <button class="btn">Create</button>
            </div>
            <board-list v-if="isShown"></board-list>
            <div class="second-actions flex align-center">
                <input
                    class="search-app-header"
                    v-model="searchTxt"
                    type="text"
                    placeholder="Search"
                />
                <div class="profile-app-header flex">
                    <div class="letter">P</div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import boardList from './board-list.vue'

export default {
    components: {
        boardList
    },
    created() { },
    data() {
        return {
            searchTxt: '',
            isShown: false
        }
    },
    methods: {
        openList(listType) {

        }
    },
    computed: {
        headerBgc() {
            return { 'trans-header': /board\//g.test(this.$route.fullPath) }
        }
    },
    unmounted() { },
}
</script>