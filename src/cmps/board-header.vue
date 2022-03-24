<template>
    <header class="board-header flex space-between align-center">
        <div class="board-nav flex">
            <div class="open-sidenav"> > </div>
            <button class="board-btn btn">Board</button>
            <div class="board-name flex" contenteditable>{{board.title}}</div>
            <button class="star-btn btn">Star opt</button>
            <div class="invited-users flex">
                <div>A</div>
                <div>CB</div>
                <div>SZ</div>
            </div>
            <button class="invite-btn btn">+ Invite</button>
        </div>

        <div class="board-action">
            <button class="filter-btn btn">Filter</button>
            <button class="right-nav-btn btn">Show menu</button>
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

}

</script>