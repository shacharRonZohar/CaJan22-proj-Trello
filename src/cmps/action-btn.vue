<template >
    <div @click="openActionPopup" class="btn btn-action" :class="actionClass">
        <div class="icon"></div>
        <span>{{ actionTxt }}</span>
    </div>
</template>

<script>
export default {
    emits: ['openActionPopup'],
    props: {
        action: String
    },
    methods: {
        openActionPopup() {
            this.$emit('openActionPopup', this.action)
        }
    },
    computed: {
        actionTxt() {
            return this.action.substring(0, this.action.indexOf('-'))
        },
        actionClass() {
            return this.action === 'cover-action' ? this.action : this.actionTxt
        }
    },
}
</script>