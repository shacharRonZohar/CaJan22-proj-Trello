<template>
    <section class="auth-actions-container">
        <div class="auth-form-container">
            <h1 class="title">Log in to Trello</h1>
            <form class="auth-input-form" @submit.prevent.stop="onUserAction">
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
        </div>
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
        onGoogleLogin() {

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