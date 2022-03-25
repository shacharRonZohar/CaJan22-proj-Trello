<template >
    <div @click.stop="toggleActionPopup" class="attach btn">
        <action-popup v-if="actionPopupOpen">
            <template #header>
                <span>Attach from...</span>
            </template>
            <template #body>
                <button class="computer">Computer</button>
                <input type="file" @change="onUploadImg" />
                <!-- <button @click="onAttach" class="confirm">Yes</button> -->
                <button @click.stop="toggleActionPopup" class="deny">No</button>
            </template>
        </action-popup>
        <div class="icon"></div>
        <button class="archive">Attachment</button>
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
            actionPopupOpen: false
        }
    },
    methods: {
        async onUploadImg(ev) {
            const img = await imgService.uploadImgFromComp(ev)
            this.$emit('onAction', { cbName: 'uploadAttachment', payload: img.url })
        },
        toggleActionPopup() {
            this.actionPopupOpen = !this.actionPopupOpen
            this.$emit('togglePopup', this.actionPopupOpen)
        }
    },

    unmounted() { },
}
</script>