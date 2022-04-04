<template>
    <section v-close="onClosePopup" @click.stop class="invite-modal">
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
                <li @click="onSetMember(user)" v-for="user in users" class="user-preview">
                    <div class="icon" :style="{ backgroundImage: `url(${user?.imgUrl})` }"></div>
                    {{ user.fullname }}
                    <div class="check-icon" v-if="isChosen(user)"></div>
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
            users: [],
            chosenUser: {}
        }
    },
    methods: {
        onSetMember(user) {
            this.chosenUser = user
        },
        onAddMember() {
            this.$store.dispatch({ type: 'addMember', user: this.chosenUser })
        },
        onClosePopup() {
            this.$emit('closePopup')
        },
        async getUsers() {
            this.users = await userService.getUsersBy(this.getBy)
        },
        isChosen(user) {
            return this.chosenUser._id === user._id
        }
    },
    computed: {
    },
    unmounted() { },
}
</script>