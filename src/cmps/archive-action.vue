<template >
    <div @click.stop class="archive btn">
        <span>Are you sure?</span>
        <button @click="onArchive" class="confirm">Yes</button>
        <button class="deny">No</button>
    </div>
</template>

<script>
// import actionPopup from './action-popup.vue'

export default {
    emits: ['action'],
    methods: {
        onArchive() {
            this.$emit('action', { cbName: 'archiveTask' })
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
        }
    },
}
</script>