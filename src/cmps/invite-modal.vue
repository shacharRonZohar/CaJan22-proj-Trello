<template>
    <section @click.stop class="invite-modal">
        <div class="header">
            <span>Invite to board</span>
            <div @click="onClosePopup" class="icon"></div>
        </div>
        <div class="body">
            <form @submit.prevent="onAddMember">
                <input
                    @input="getUsers"
                    v-model="getBy"
                    type="text"
                    placeholder="Email address or name"
                />
                <button class="send-invite">Send invitation</button>
            </form>
            <ul v-if="users?.length" class="user-list clean-list">
                <li @click="onAddMember(user)" v-for="user in users" class="user-preview">
                    <div class="icon" :style="{ backgroundImage: `url(${user?.imgUrl})` }"></div>
                    {{ user.fullname }}
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { userService } from '../services/user-service.js'

export default {
    // props: [''],
    components: {},
    created() { },
    data() {
        return {
            getBy: '',
            users: []
        }
    },
    methods: {
        onAddMember(user) {
            console.log(user)
            this.$store.dispatch({ type: 'addMember', user })
        },
        onClosePopup() {
            this.$emit('closePopup')
        },
        async getUsers() {
            this.users = await userService.getUsersBy(this.getBy)
        }
    },
    computed: {},
    unmounted() { },
}
</script>