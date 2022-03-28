<template>
    <component :is="headerType"></component>
</template>

<script>
import homeHeader from './home-header.vue'
import loginHeader from './login-header.vue'
import appHeader from './app-header.vue'

export default {
    components: {
        homeHeader,
        loginHeader,
        appHeader
    },
    methods: {},
    computed: {
        headerType() {
            const path = this.$route.fullPath
            if (path === '/') return 'home-header'
            else if (path === '/auth/login' || path === '/auth/signup') return 'login-header'
            else return 'app-header'
        }
    },
}
</script>