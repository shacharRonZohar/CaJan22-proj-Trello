<template>
    <header :class="headerBgc" class="main-header app-header flex align-center">
        <div @click="AppHeaderClicked" class="logo flex align-center">
            <img class="gif-logo" src alt />
            <span class="logo-txt">Twello</span>
        </div>

        <div class="board-main-nav flex space-between align-center">
            <div class="actions">
                <button @click="openList" class="btn wide-s">
                    <span>
                        Board
                        <span class="svg-icon expand"></span>
                    </span>
                </button>
                <button class="btn wide-s">
                    <span>
                        Starred
                        <span class="svg-icon expand"></span>
                    </span>
                </button>

                <button class="btn narrow-s">
                    <span>
                        More
                        <span class="svg-icon expand"></span>
                    </span>
                </button>

                <button @click="onToggleAddBoard" class="btn create-btn xnarrow-s">Create</button>
            </div>
            <add-board v-if="createClicked" @addedBoard="onToggleAddBoard"></add-board>
            <header-board-list v-if="isShown" @closeModal="openList" :boards="boards"></header-board-list>

            <div class="second-actions flex">
                <router-link to="/listening" class="btn btn-sr">SR</router-link>
                <div class="search-app-header">
                    <!-- <span class="search-icon"></span> -->
                    <img class="search-icon" src="../assets/icons/search-icon.png" alt />
                    <img class="search-icon-b" src="../assets/icons/search-black.png" alt />
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
                <button class="info btn">
                    <span class="info-icon"></span>
                </button>
                <button class="notifications btn">
                    <span class="notifications-icon"></span>
                </button>
                <div
                    @click="onToggleProfileModal"
                    class="profile-app-header flex"
                    :style="{ backgroundImage: `url(${loggedInUser?.imgUrl})` }"
                >
                    <!-- <div :style="{ backgroundImage: `url(${loggedInUser.imgUrl})` }" class="letter"></div> -->
                    <profile-modal
                        @closeModal="onToggleProfileModal"
                        :user="loggedInUser"
                        v-if="profileModalOpen"
                    />
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import headerBoardList from './header-board-list.vue'
import addBoard from './add-board.vue'
import profileModal from './profile-modal.vue'
export default {
    components: {
        headerBoardList,
        addBoard,
        profileModal
    },
    created() {
    },
    data() {
        return {
            searchTxt: '',
            isShown: false,
            createClicked: false,
            profileModalOpen: false
        }
    },
    methods: {
        openList(listType) {
            this.isShown = !this.isShown
        },
        AppHeaderClicked() {
            this.$router.push('/board')
        },
        onToggleAddBoard() {
            this.createClicked = !this.createClicked
        },
        onToggleProfileModal() {
            this.profileModalOpen = !this.profileModalOpen
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
        },
        loggedInUser() {
            return this.$store.getters.loggedInUser
        }
    },
    unmounted() { },
}
</script>