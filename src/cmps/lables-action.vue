<template >
    <div @click.stop class="label btn">
        <div class="header">
            <span class="labels-title" v-if="!createLabelOpen">Labels</span>
            <div v-else class="create-label-header-container">
                <button @click="toggleCreateLabel" class="back"></button>
                <span>Create label</span>
            </div>
            <!-- <button class="close-action" @click="toggleActionPopup"></button> -->
        </div>
        <div class="body label-list-container">
            <ul v-if="!createLabelOpen" class="clean-list">
                <li
                    @click="onLabel(label.id)"
                    class="label-list-item flex"
                    v-for="label in labels"
                    :key="label"
                    :style="{ backgroundColor: label.color }"
                >
                    {{ label.title }}
                    <a class="selected-icon" v-if="isChosen(label.id)"></a>
                </li>
                <button class="btn create-new-label" @click="toggleCreateLabel">Create a new label</button>
            </ul>
            <div v-else class="create-label-container">
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
                        <div class="selected-icon" v-if="newLabel.color === clr"></div>
                    </li>
                </ul>
                <button @click="saveNewLabel" class="create-label-btn btn">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
// import actionPopup from './action-popup.vue'

export default {
    props: {
        task: Object
    },
    emits: ['action'],
    components: {
        // actionPopup
    },
    created() {
    },
    data() {
        return {
            createLabelOpen: false,
            clrOpts: ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563'],
            newLabel: {
                title: '',
                color: 'red'
            }
        }
    },
    methods: {
        onLabel(labelId) {
            this.$emit('action', { cbName: 'toggleLabel', payload: labelId })
        },
        setNewLabelClr(clr) {
            this.newLabel.color = clr
        },
        saveNewLabel() {
            this.$emit('action', { cbName: 'saveNewLabel', payload: JSON.parse(JSON.stringify(this.newLabel)) })
            this.newLabel = {
                title: '',
                color: ''
            }
        },
        toggleCreateLabel() {
            this.createLabelOpen = !this.createLabelOpen
        },
        isChosen(label) {
            if (!this.task.labelIds) return false
            return this.task.labelIds.includes(label)
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

<style>
</style>