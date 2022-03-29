<template>
    <section @click="onLogout">Logout</section>
</template>

<script>
// import appHeader from './components/app-header.vue'
import { authService } from '../services/auth.service.js'
export default {
    // props: [''],
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {
        onLogout() {
            authService.logout()
        }
    },
    computed: {},
    unmounted() { },
}
</script>