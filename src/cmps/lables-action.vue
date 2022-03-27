<template >
    <div @click="toggleActionPopup" class="label btn">
        <!-- <template v-if="!createLabelOpen"> -->
        <!-- <action-popup @click.stop v-if="actionPopupOpen">
            <template #header>
                <div class="header">
                    <span v-if="!createLabelOpen">Labels</span>
                    <button v-else @click="toggleCreateLabel" class="back"></button>
                    <span v-if="createLabelOpen">Create label</span>
                    <button class="close-action" @click="toggleActionPopup"></button>
                </div>
            </template>
            <template #body>
                <div class="body">
                    <ul v-if="!createLabelOpen" class="clean-list">
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
                        <button class="btn" @click="toggleCreateLabel">Add new label</button>
                    </ul>
                    <div v-else class="create-label-container">
                        <label for>
                            Name
                            <input
                                v-model="newLabel.title"
                                type="text"
                                class="new-label-title"
                                v-focus
                            />
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
                        <button @click="saveNewLabel" class="create btn">Create</button>
                    </div>
                </div>
            </template>
        </action-popup>-->
        <div class="icon"></div>
        <button class="labels">Labels</button>
        <div v-if="actionPopupOpen" @click.stop="toggleActionPopup" class="clickable-background"></div>
    </div>
</template>

<script>
// import actionPopup from './action-popup.vue'

export default {
    props: {
        chosenLabels: Array
    },
    emits: ['onAction'],
    components: {
        // actionPopup
    },
    created() { },
    data() {
        return {
            actionPopupOpen: false,
            createLabelOpen: false,
            clrOpts: ['red', 'yellow'],
            newLabel: {
                title: '',
                color: 'red'
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