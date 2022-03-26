<template >
    <div @click="toggleActionPopup" class="members btn">
        <!--<action-popup v-if="actionPopupOpen" class="members-popup">
            <template #header>
                <span>Add members!</span>
            </template>
        </action-popup>
        <div v-if="actionPopupOpen" @click.stop="toggleActionPopup" class="clickable-background"></div>-->
        <div class="icon"></div>
        <button class="members">Members</button>
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