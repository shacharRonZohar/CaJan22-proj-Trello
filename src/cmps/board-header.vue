<template>
    <header class="board-header flex space-between align-center">
        <div class="board-nav flex">
            <!-- <div class="open-sidenav flex"><span class="svg-icon arrow-right"></span></div> -->

            <button class="board-btn btn">
                <span class="svg-icon board-icon"></span> Board
            </button>

            <div class="board-name flex" @blur="onSaveBoardName" contenteditable>{{ board.title }}</div>

            <button class="star-btn btn" @click="onToggleBoardStar" :class="isStarred" />

            <div class="invited-users flex">
                <span
                    v-for="member in board.members"
                    :key="member._id"
                    :style="{ backgroundImage: `url(${member.imgUrl})` }"
                ></span>
            </div>

            <button @click="onToggleInviteModal" class="invite-btn btn">
                <span class="invite"></span> Invite
                <invite-modal @closePopup="onToggleInviteModal" v-if="inviteModalOpen" />
            </button>
        </div>

        <div class="board-action">
            <button @click="onOpenFilter" class="filter-btn btn">
                <span>
                    <span class="svg-icon filter"></span> Filter
                </span>
            </button>
            <button @click="onOpenMenu" class="right-nav-btn btn">
                <span class="dots"></span>Show menu
            </button>
        </div>
    </header>
    <board-filter-modal v-if="isFilterOpen" @closeModal="onOpenFilter"></board-filter-modal>
</template>

<script>
import boardFilterModal from '../cmps/board-filter-modal.vue'
import inviteModal from '../cmps/invite-modal.vue'

export default {
    components: {
        boardFilterModal,
        inviteModal
    },
    props: {
        board: Object
    },
    emits: ['openMenu'],
    data() {
        return {
            isFilterOpen: false,
            inviteModalOpen: false
        }
    },
    methods: {
        async onSaveBoardName(ev) {
            this.board.title = ev.target.innerText
            this.$store.dispatch({ type: 'saveBoard', boardToSave: this.board })
        },
        onOpenMenu() {
            this.$emit('openMenu')
        },
        onOpenFilter() {
            this.isFilterOpen = !this.isFilterOpen
        },
        onToggleInviteModal() {
            this.inviteModalOpen = !this.inviteModalOpen
        },
        onToggleBoardStar() {
            this.$store.dispatch({ type: 'starredBoardToggle', board: this.board })
        }
    },
    computed: {
        isStarred() {
            const user = this.$store.getters.loggedInUser
            return { 'starred': this.board.starredBy?.includes(user._id) }
        }
    }
}

</script>