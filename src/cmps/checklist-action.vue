<template >
    <div @click="toggleActionPopup" class="checklist btn">
        <!-- <action-popup v-if="actionPopupOpen"> -->
        <!-- <template #header>
                <span>Are you sure?</span>
            </template>
            <template #body>
                <button @click="onChecklist" class="confirm">Yes</button>
                <button class="deny">No</button>
        </template>-->
        <!-- </action-popup> -->
        <div v-if="actionPopupOpen" @click.stop="toggleActionPopup" class="clickable-background"></div>
        <div class="icon"></div>
        <button class="checklists">Checklist</button>
    </div>
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
        onChecklist() {
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