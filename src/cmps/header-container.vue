<template>
    <component :is="headerType"></component>
</template>

<script>
import homeHeader from './home-header.vue';
import loginHeader from './login-header.vue';
import appHeader from './app-header.vue';

export default {
    components: {
        homeHeader,
        loginHeader,
        appHeader
    },
    created() { 
        console.log(this.$route.fullPath);
    },
    data() {
        return {}
    },
    methods: {},
    computed: {
        headerType() {
            const path = this.$route.fullPath
            if (path === '/') return 'home-header'
            else if (path === '/login' || path === '/signup') return 'login-header'
            else return 'app-header'
        }
    },
    unmounted() { },
}
</script>