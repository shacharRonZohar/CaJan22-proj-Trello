<template>
    <header class="main-header app-header flex align-center">
        <div class="logo">Twello</div>

        <div class="board-main-nav flex space-between">
            <div class="actions">
                <button class="btn">Board</button>
                <button class="btn">Starred</button>

                <button class="btn">Create</button>
            </div>
            <board-list v-if="isShown"></board-list>
            <div>
                <input 
                v-model="searchTxt"
                type="text" 
                placeholder="Search" />
                <span>Profile</span>
            </div>
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