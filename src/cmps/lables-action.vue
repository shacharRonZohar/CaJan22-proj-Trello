<template >
    <div @click="toggleActionPopup" class="label btn">
        <action-popup @click.stop v-if="actionPopupOpen">
            <template #header>
                <span>Labels</span>
            </template>
            <template #body>
                <ul class="clean-list">
                    <li
                        @click="onLabel(label.id)"
                        class="label"
                        v-for="label in labels"
                        :style="{ backgroundColor: label.color }"
                    >{{ label.title }}</li>
                </ul>
            </template>-->
        </action-popup>
        <div class="icon"></div>
        <button class="labels">Label</button>
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
        onLabel(labelId) {
            this.$emit('onAction', { cbName: 'toggleLabel', payload: labelId })
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
        }
    },
    computed: {
        labels() {
            return this.$store.getters.labels
        }
    },
    unmounted() { },
}
</script>