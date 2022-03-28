<template>
    <div class="board-filter-modal">
        <div class="header flex align-center">
            <span class="title">Filter</span>
            <button @click="onCloseFilter" class="close-btn btn"></button>
        </div>

        <div class="body">
            <form>
                <p class="input-title">Keyword</p>
                <input 
                class="filter-input" 
                v-model="filterBy.txt" 
                placeholder="Enter a Keyword..."
                type="text">
                <p class="input-desc">Search cards, members, labels, and more.</p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['closeModal'],
    data() {
        return {
            filterBy: {
                txt: ''
            }
        }
    },
    methods: {
        onCloseFilter() {
            this.$emit('closeModal')
        }
    }
}
</script>

<style>

</style>