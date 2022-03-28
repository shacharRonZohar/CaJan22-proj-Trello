<template >
    <div @click="toggleActionPopup"></div>
</template>

<script>
// import actionPopup from './action-popup.vue'
export default {
    // props: [''],
    emits: ['onAction'],
    components: {
        // actionPopup
    },
    created() { },
    data() {
        return {
            actionPopupOpen: false
        }
    },
    methods: {
        onArchive() {
            this.$emit('onAction', 'membersAction')
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
        }
    },
    computed: {},
    unmounted() { },
}
</script>