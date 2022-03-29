<template>
    <section class="invite-modal">
        <div class="header">
            <span>Invite to board</span>
        </div>
        <div class="body">
            <form @submit.prevent="onAddMember">
                <input v-model="inviteBy.txt" type="text" placeholder="Email address or name" />
                <button class="send-invite">Send invitation</button>
            </form>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board.service.js'

export default {
    // props: [''],
    components: {},
    created() { },
    data() {
        return {
            inviteBy: {
                txt: ''
            }
        }
    },
    methods: {
        onAddMember() {
            this.$store.dispatch({ type: 'addMember', inviteBy: this.inviteBy })
        }
    },
    computed: {},
    unmounted() { },
}
</script>