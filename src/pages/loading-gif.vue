<template>
    <div v-if="!isReady" class="loading-container">
        <span class="loading-gif"></span>
    </div>
</template>

<script>

export default {
    computed: {
        isReady() {
            return this.$store.getters.isReady
        }
    },
}
</script>