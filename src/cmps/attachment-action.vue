<template >
    <div @click.stop="toggleActionPopup" class="attach btn">
        <action-popup @click.stop v-if="actionPopupOpen">
            <template #header>
                <span class="header">Attach from...</span>
            </template>
            <template #body>
                <ul class="clean-list">
                    <li>
                        <label @click.stop for="file" class="computer body">
                            Computer
                            <input
                                id="file"
                                type="file"
                                @change.stop="onUploadImg"
                                @click.stop
                            />
                        </label>
                    </li>
                </ul>
                <!-- <button @click="onAttach" class="confirm">Yes</button> -->
            </template>
        </action-popup>
        <!-- <button @click.stop="toggleActionPopup" class="deny">No</button> -->
        <div v-if="actionPopupOpen" @click.stop="toggleActionPopup" class="clickable-background"></div>
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