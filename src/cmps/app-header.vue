<template>
    <header class="main-header app-header flex">
        <div class="logo">Twello |</div>

        <div class="board-main-nav">
            <button>Board</button>
            <div class="board-list">
                <span>Boards</span>
                <button>x</button>
            </div>
            <button>Starred</button>
            <button>Create</button>

            <input 
            v-model="searchTxt"
            type="text" 
            placeholder="Search" />
            <span>Profile</span>
        </div>
    </header>
</template>

<script>
export default {
    components: {},
    created() { },
    data() {
        return {
            searchTxt: '',
        }
    },
    methods: {},
    computed: {},
    unmounted() { },
}
</script>