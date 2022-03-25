<template >
    <div @click="toggleActionPopup" class="location btn">
        <!-- <action-popup v-if="actionPopupOpen"> -->
        <!-- <template #header>
                <span>Are you sure?</span>
            </template>
            <template #body>
                <button @click="onLocation" class="confirm">Yes</button>
                <button class="deny">No</button>
        </template>-->
        <!-- </action-popup> -->
        <div class="icon"></div>
        <button class="location">Location</button>
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
        onLocation() {
            // this.$emit('onAction', 'lableTask')
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
        }
    },
    computed: {},
    unmounted() { },
}
</script>