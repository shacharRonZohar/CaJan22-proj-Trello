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
                <div @click="onRemoveCover" v-if="chosenColor" class="remove-cover">Remove cover</div>
                <ul class="clean-list cover-clrs">
                    <li
                        @click="onChooseCover(color)"
                        v-for="color in colors"
                        :key="color"
                        :style="{ backgroundColor: color }"
                    >
                        <div class="chosen" v-if="isChosenColor(color)"></div>
                    </li>
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
        onChooseCover(color) {
            this.$emit('onAction', { cbName: 'chooseCover', payload: { type: 'color', thing: color } })
            this.chosenColor = color
        },
        onRemoveCover() {
            this.$emit('onAction', { cbName: 'removeCover' })
            this.chosenColor = ''
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
            this.$emit('togglePopup', this.actionPopupOpen)
        },
        isChosenColor(color) {
            return this.chosenColor === color
        }
    },
    unmounted() { },
}
</script>