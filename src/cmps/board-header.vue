<template>
    <header class="board-header flex space-between align-center">
        <div class="board-nav flex">
            <div class="open-sidenav flex"><span class="svg-icon arrow-right"></span></div>

            <button class="board-btn btn"><span class="svg-icon board-icon"></span> Board</button>

            <div class="board-name flex" contenteditable>{{board.title}}</div>

            <button class="star-btn btn"></button>

            <div class="invited-users flex">
                <div>A</div>
                <div>CB</div>
                <div>SZ</div>
            </div>
            
            <button class="invite-btn btn"><span class="invite"></span> Invite</button>
        </div>

        <div class="board-action">
            <button class="filter-btn btn">
                <span><span class="svg-icon filter"></span> Filter</span>
            </button>
            <button @click="onOpenMenu" class="right-nav-btn btn"><span class="dots"></span>Show menu</button>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        board: Object
    },
    emits: ['openMenu'],
    created() {
        console.log(this.board);
    },
    methods: {
        onOpenMenu() {
            this.$emit('openMenu')
        }
    }

}

</script>