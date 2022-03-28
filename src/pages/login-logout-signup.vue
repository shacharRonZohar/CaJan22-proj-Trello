<template>
    <section class="user-actions-container">
        <form class="login-form" @submit.prevent.stop="onUserAction">
            <input v-model="user.username" type="text" class="username" placeholder="username" />
            <input v-model="user.password" type="password" class="password" placeholder="password" />
            <input v-model="user.fullname" type="text" class="fullname" placeholder="fullname" />
            <button>Login</button>
        </form>
        <button @click="onLogout" class="signout">Logout</button>
    </section>
</template>

<script>
import { authService } from '../services/auth.service.js'

export default {
    // props: [''],
    components: {},
    created() { },
    data() {
        return {
            currAction: 'login',
            user: {
                username: '',
                password: '',
                fullname: ''
            }
        }
    },
    methods: {
        onUserAction() {
            switch (this.currAction) {
                case 'login':
                    return this.login()
                case 'logout':
                    return this.logout()
                case 'signup':
                    return this.signup()
            }
        },
        async login() {
            await authService.login(this.user)
            this.$store.dispatch('loadUser')
        },
        async logout() {
            await authService.logout()
            this.$store.dispatch('loadUser')
        },
        async signup() {
            console.log(this.user)
            await authService.signup(this.user)
            this.$store.dispatch('loadUser')
        }
    },
    computed: {},
    unmounted() { },
}
</script>