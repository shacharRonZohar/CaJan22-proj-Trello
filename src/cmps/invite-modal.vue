<template>
    <section @click.stop class="invite-modal">
        <div class="header">
            <span>Invite to board</span>
            <div @click="onClosePopup" class="icon"></div>
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
        },
        onClosePopup() {
            this.$emit('closePopup')
        }
    },
    computed: {},
    unmounted() { },
}
</script>