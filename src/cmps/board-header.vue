<template>
    <!-- TODO remove inline style -->
    <header :class="headerBgc" class="board-header flex space-between align-center">
        <div class="board-nav flex">
            <button class="open-sidenav"> > </button>
            <button>Board</button>
            <span class="board-name" contenteditable>{{board.title}}</span>
            <button>Star opt</button>
            <div>
                <span>| A </span>
                <span>| CB |</span>
                <span> SZ |</span>
            </div>
            <button class="invite-btn">+ Invite</button>
        </div>
        <div>
            <button>Filter</button>
            <button>Show menu</button>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        board: Object
    },
    created() {
        console.log(this.board);
    },
    computed: {
        headerBgc() {
            return {'trans-header': /board\//g.test(this.$route.fullPath)}
        }
    }
}

</script>