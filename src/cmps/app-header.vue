<template>
    <header :class="headerBgc" class="main-header app-header flex align-center">
        <div @click="AppHeaderClicked" class="logo flex align-center">
            <img class="gif-logo" src="" alt="">
            <span class="logo-txt">Twello</span>
        </div>

        <div class="board-main-nav flex space-between align-center">
            <div class="actions">
                <button class="btn wide-s">
                    <span>Board <span class="svg-icon expand"></span></span>
                </button>
                <button class="btn wide-s">
                    <span>Starred <span class="svg-icon expand"></span></span>
                </button>

                <button class="btn narrow-s">
                    <span>More <span class="svg-icon expand"></span></span>
                </button>

                <button class="btn create-btn">Create</button>
            </div>
            <header-board-list v-if="isShown"></header-board-list>

            <div class="second-actions flex align-center">
                <div class="search-app-header">
                    <input
                        class="search-input"
                        v-model="searchTxt"
                        type="text"
                        placeholder="Search"
                    />
                </div>
                <div class="mini-search">
                    <span class="search-icon svg-icon"></span>
                </div>
                <div class="profile-app-header flex">
                    <div class="letter">P</div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import headerBoardList from './header-board-list.vue'

export default {
    components: {
        headerBoardList
    },
    created() {
        // this.printAverageColor()
    },
    data() {
        return {
            searchTxt: '',
            isShown: false,
        }
    },
    methods: {
        openList(listType) {

        },
        AppHeaderClicked() {
            this.$router.push('/board')
        }
        // async printAverageColor() {
        //     const color = await getAverageColor();
        //     console.log(color);
        // }
    },
    computed: {
        headerBgc() {
            return { 'trans-header': /board\//g.test(this.$route.fullPath) }
        },
        boards() {
            return this.$store.getters.boards
        },
        currBoard() {
            return this.$store.getters.board
        }
    },
    unmounted() { },
}
</script>