<template>
    <!-- TODO remove inline style -->
    <header style="height: 45px; border: 1px solid black" class="board-header flex space-between align-center">
        <div class="board-nav flex">
            <button class="open-sidenav"> > </button>
            <button>Board</button>
            <span class="board-name" contenteditable>Board Name</span>
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