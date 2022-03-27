<template>
    <component v-close class="action-popup" v-if="action" :is="action" :task="task"></component>
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
    emits: ['closePopup'],
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
    created() { },
    data() {
        return {}
    },
    methods: {
        onClose() {
            this.$emit('closePopup')
        },
        onAction(action) {
            this.$emit('onAction', action)
        }
    },
    computed: {},
    unmounted() { },
}
</script>