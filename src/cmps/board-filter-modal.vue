<template>
    <div class="board-filter-modal">
        <div class="header flex space-between align-center">
            <span class="title">Filter</span>
            <button class="close-btn btn">x</button>
        </div>
        <hr>

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
    data() {
        return {
            filterBy: {
                txt: ''
            }
        }
    }
}
</script>

<style>

</style>