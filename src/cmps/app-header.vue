<template>
    <header class="main-header app-header flex">
        <div class="logo">Twello |</div>

        <div class="board-main-nav">
            <button>Board</button>
            <button>Starred</button>
            <board-list v-if="isShown"></board-list>

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
    computed: {},
    unmounted() { },
}
</script>