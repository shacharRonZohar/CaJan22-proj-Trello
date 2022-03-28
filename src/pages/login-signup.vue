<template>
    <section class="user-actions-container">
        <form class="user-input-form" @submit.prevent.stop="onUserAction">
            <input
                v-model="user.username"
                type="text"
                class="username"
                placeholder="username"
                required
            />
            <input
                v-model="user.password"
                type="password"
                class="password"
                placeholder="password"
                required
            />
            <input
                v-if="currAction === 'signup'"
                v-model="user.fullname"
                type="text"
                class="fullname"
                placeholder="fullname"
                required
            />
            <button>{{ currAction }}</button>
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
            user: {
                username: '',
                password: '',
                fullname: ''
            }
        }
    },
    methods: {
        onUserAction() {
            if (this.currAction === 'login') return this.login()
            this.signup()
        },
        async login() {
            try {
                await authService.login(this.user)
                await this.$store.dispatch('loadUser')
                this.$router.push('/board')
            } catch (err) {
                console.log(err)
            }
        },
        async logout() {
            try {
                await authService.logout()
                this.$store.dispatch('loadUser')
            } catch (err) {
                console.log(err)
            }
        },
        async signup() {
            try {
                await authService.signup(this.user)
                this.$store.dispatch('loadUser')
                this.$router.push('/board')
            } catch (err) {
                console.log(err)
            }
        }
    },
    computed: {
        currAction() {
            return this.$route.params.action
        }
    },
    unmounted() { },
}
</script>