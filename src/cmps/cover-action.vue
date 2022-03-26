<template >
    <div @click.stop="toggleActionPopup" class="cover btn">
        <action-popup @click.stop v-if="actionPopupOpen">
            <template #header>
                <span class="header">Cover</span>
            </template>
            <template #body>
                <ul class="clean-list cover-clrs">
                    <li
                        @click="onChooseCover(color)"
                        v-for="color in colors"
                        :style="{ backgroundColor: color }"
                    ></li>
                </ul>
            </template>
        </action-popup>
        <div v-if="actionPopupOpen" @click.stop="toggleActionPopup" class="clickable-background"></div>
        <div class="icon"></div>
        <button class="cover">Cover</button>
    </div>
</template>

<script>
import actionPopup from './action-popup.vue'
import { imgService } from '../services/imgService.js'

export default {
    // props: [''],
    emits: ['onAction', 'togglePopup'],
    components: {
        actionPopup
    },
    created() { },
    data() {
        return {
            actionPopupOpen: false,
            colors: ['yellow', 'red', 'pink']
        }
    },
    methods: {
        async onChooseCover(color) {
            this.$emit('onAction', { cbName: 'chooseCover', payload: { type: 'color', thing: color } })
            this.toggleActionPopup()
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
            this.$emit('togglePopup', this.actionPopupOpen)
        }
    },

    unmounted() { },
}
</script>