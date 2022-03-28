<template >
    <div @click.stop class="attach btn">
        <div class="header">
            <span>Attach from...</span>
            <!-- <button class="close-action" @click="toggleActionPopup"></button> -->
        </div>
        <ul class="clean-list">
            <li>
                <label @click.stop for="file" class="computer body">
                    Computer
                    <input id="file" type="file" @change.stop="onUploadImg" @click.stop />
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
import { imgService } from '../services/imgService.js'

export default {
    emits: ['action'],
    methods: {
        async onUploadImg(ev) {
            const img = await imgService.uploadImgFromComp(ev)
            this.$emit('action', { cbName: 'uploadAttachment', payload: img.url })
        },
    }
}
</script>