<template>
    <div class="action-popup">
        <div class="header">
            {{ actionTxt }}
            <div class="icon btn close-popup"></div>
        </div>
        <component
            @togglePopup="onTogglePopup"
            @action="onAction"
            v-if="action"
            :is="action"
            :task="task"
        ></component>
    </div>
</template>

<script>
import archiveAction from "./archive-action.vue"
import membersAction from "./members-action.vue"
import attachmentAction from "./attachment-action.vue"
import labelAction from "./lables-action.vue"
import checklistAction from "./checklist-action.vue"
import datesAction from "./dates-action.vue"
import locationAction from "./location-action.vue"
import coverAction from "./cover-action.vue"

export default {
    emits: ['togglePopup', 'action'],
    props: {
        action: String,
        task: Object
    },
    components: {
        archiveAction,
        membersAction,
        attachmentAction,
        labelAction,
        checklistAction,
        datesAction,
        coverAction,
        locationAction,
    },
    created() {
        console.log(this.task)
    },
    data() {
        return {}
    },
    methods: {
        onTogglePopup() {
            this.$emit('togglePopup')
        },
        onAction(action) {
            this.$emit('action', action)
        },
        onActions(actions) {
            this.$emit('actions', actions)
        },

    },
    computed: {
        actionTxt() {
            return this.action.substring(0, this.action.indexOf('-'))
        }
    },
    unmounted() { },
}
</script>