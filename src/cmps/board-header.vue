<template>
    <header class="board-header flex space-between align-center">
        <div class="board-nav flex">
            <!-- <div class="open-sidenav flex"><span class="svg-icon arrow-right"></span></div> -->

            <button class="board-btn btn">
                <span class="svg-icon board-icon"></span> Board
            </button>

            <div class="board-name flex" @blur="onSaveBoardName" contenteditable>{{ board.title }}</div>

            <button class="star-btn btn"></button>

            <div class="invited-users flex">
                <span>A</span>
                <span>CB</span>
                <span>SZ</span>
            </div>

            <button class="invite-btn btn">
                <span class="invite"></span> Invite
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

export default {
    components: {
        boardFilterModal
    },
    props: {
        board: Object
    },
    emits: ['openMenu'],
    data() {
        return {
            isFilterOpen: false
        }
    },
    methods: {
        async onSaveBoardName(ev) {
            this.board.title = ev.target.innerText
            this.$store.dispatch({type: 'saveBoard', boardToSave: this.board})
        },
        onOpenMenu() {
            this.$emit('openMenu')
        },
        onOpenFilter() {
            this.isFilterOpen = !this.isFilterOpen
        }
    },
    created() {

    },
}

</script>