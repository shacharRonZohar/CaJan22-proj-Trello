<template>
    <section class="auth-actions-container">
        {{ Vue3GoogleOauth.isInit }}
        {{ Vue3GoogleOauth.isAuthorized }}
        <button
            @click="onUserGoogleAction"
            class="google-login"
        >{{ currAction }} with google</button>
        <div class="auth-form-container">
            <h1 class="title">Log in to Trello</h1>
            <form class="auth-input-form" @submit.prevent.stop="onUserAction">
                <input
                    v-model="user.username"
                    type="text"
                    class="username"
                    placeholder="Enter your email"
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
// import Vue3GoogleOatuh
import { inject } from 'vue'
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
            },
            Vue3GoogleOauth: inject('Vue3GoogleOauth')
        }
    },
    methods: {
        onUserAction() {
            if (this.currAction === 'login') return this.login()
            this.signup()
        },
        onUserGoogleAction() {
            if (this.currAction === 'login') return this.loginWithGoogle()
            this.signupWithGoogle()
        },
        async loginWithGoogle() {
            try {
                const user = await this.$gAuth.signIn()
                const cred = {
                    fullname: user.Du.tf,
                    username: user.Du.tv
                }
                if (user) authService.loginWithGoogle(cred)
                // console.log(user)
            } catch (err) {
                console.log(err)
            }
        },
        async signupWithGoogle() {
            try {
                const user = await this.$gAuth.signIn()
                const cred = {
                    fullname: user.Du.tf,
                    username: user.Du.tv
                }
                if (user) authService.signupWithGoogle(cred)
            } catch (err) {
                console.log(err)
            }
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