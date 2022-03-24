<template >
    <div @click="toggleActionPopup" class="archive btn">
        <action-popup v-if="actionPopupOpen">
            <template #header>
                <span>Are you sure?</span>
            </template>
            <template #body>
                <button @click="onArchive" class="confirm">Yes</button>
                <button class="deny">No</button>
            </template>
        </action-popup>
        <div class="icon"></div>
        <button class="archive">Archive</button>
    </div>
</template>

<script>
import actionPopup from './action-popup.vue'

export default {
    // props: [''],
    emits: ['onAction'],
    components: {
        actionPopup
    },
    created() { },
    data() {
        return {
            actionPopupOpen: false
        }
    },
    methods: {
        onArchive() {
            this.$emit('onAction', 'archiveTask')
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
        }
    },
    computed: {},
    unmounted() { },
}
</script>