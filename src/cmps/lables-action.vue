<template >
    <div @click="toggleActionPopup" class="label btn">
        <action-popup @click.stop v-if="actionPopupOpen">
            <!-- <template v-if="!createLabelOpen"> -->
            <template v-if="!createLabelOpen" #header>
                <span>Labels</span>
            </template>
            <template v-else #header>
                <span>Create label</span>
            </template>
            <template v-if="!createLabelOpen" #body>
                <ul class="clean-list">
                    <li
                        @click="onLabel(label.id)"
                        class="label"
                        v-for="label in labels"
                        :key="label"
                        :style="{ backgroundColor: label.color }"
                    >
                        {{ label.title }}
                        <div class="icon" v-if="isChosen(label.id)"></div>
                    </li>
                    <li @click="toggleCreateLabel">Add new label</li>
                </ul>
            </template>
            <template v-else #body>
                <label for>
                    Name
                    <input v-model="newLabel.title" type="text" class="new-label-title" v-focus />
                </label>
                <ul class="clean-list clr-opts">
                    <li
                        v-for="clr in clrOpts"
                        :key="clr"
                        @click="setNewLabelClr(clr)"
                        class="clr-opt"
                        :style="{ backgroundColor: clr }"
                    >
                        <div class="icon" v-if="newLabel.color === clr"></div>
                    </li>
                </ul>
                <button @click="saveNewLabel" class="create">Create</button>
            </template>
        </action-popup>
        <div class="icon"></div>
        <button class="labels">Label</button>
        <div v-if="actionPopupOpen" @click.stop="toggleActionPopup" class="clickable-background"></div>
    </div>
</template>

<script>
import actionPopup from './action-popup.vue'

export default {
    props: {
        chosenLabels: Array
    },
    emits: ['onAction'],
    components: {
        actionPopup
    },
    created() { },
    data() {
        return {
            actionPopupOpen: false,
            createLabelOpen: false,
            clrOpts: ['red', 'yellow'],
            newLabel: {
                title: '',
                color: ''
            }
        }
    },
    methods: {
        onLabel(labelId) {
            this.$emit('onAction', { cbName: 'toggleLabel', payload: labelId })
        },
        setNewLabelClr(clr) {
            this.newLabel.color = clr
        },
        saveNewLabel() {
            this.$emit('onAction', { cbName: 'saveNewLabel', payload: JSON.parse(JSON.stringify(this.newLabel)) })
            this.newLabel = {
                title: '',
                color: ''
            }
            this.toggleActionPopup()
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
        },
        toggleCreateLabel() {
            this.createLabelOpen = !this.createLabelOpen
        },
        isChosen(label) {
            // console.log(this?.chosenLabels)
            // console.log(label)
            if (!this.chosenLabels) return false
            return this.chosenLabels.includes(label)
        }
    },
    computed: {
        labels() {
            return this.$store.getters.labels
        },

    },
    unmounted() { },
}
</script>