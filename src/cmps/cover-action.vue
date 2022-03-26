<template >
    <div @click.stop="toggleActionPopup" class="cover-action btn">
        <action-popup @click.stop v-if="actionPopupOpen">
            <template #header>
                <div class="header">
                    <span>Cover</span>
                    <button class="close-action" @click="toggleActionPopup"></button>
                </div>
            </template>
            <template #body>
                <ul class="clean-list cover-clrs">
                    <li
                        @click="onChooseCover(color)"
                        v-for="color in colors"
                        :key="color"
                        :style="{ backgroundColor: color }"
                    ></li>
                </ul>
            </template>
        </action-popup>
        <div v-if="actionPopupOpen" @click.stop="toggleActionPopup" class="clickable-background"></div>
        <div class="icon"></div>
        <button class="cover-action">Cover</button>
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
            colors: ['yellow', 'red', 'pink'],
            chosenColor: ''
        }
    },
    methods: {
        async onChooseCover(color) {
            this.$emit('onAction', { cbName: 'chooseCover', payload: { type: 'color', thing: color } })
            // this.toggleActionPopup()
            this.chosenColor = color
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
            this.$emit('togglePopup', this.actionPopupOpen)
        }
    },

    unmounted() { },
}
</script>