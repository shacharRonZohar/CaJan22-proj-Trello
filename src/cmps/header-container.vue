<template>
    <component :is="headerType"></component>

    <!-- <header class="main-header"> -->
        <!-- <div class="logo">Twello</div> -->
        
        <!-- <nav class="main-nav-container"> -->
            <!-- <div class="home-nav"> -->
                <!-- <ul> -->
                    <!-- <li> -->
                        <!-- <router-link to="/login" class="login-link">Log in</router-link> -->
                    <!-- </li> -->
                    <!-- <li> -->
                        <!-- <router-link to="/signup" class="signup-board">Sing up</router-link> -->
                    <!-- </li> -->
                <!-- </ul> -->
            <!-- </div> -->
            <!-- <div class="board-main-nav"> -->
                <!-- <ul> -->
                    <!-- <li>Starred</li> -->
                    <!-- <li>Create</li> -->
                    <!-- <li>Search</li> -->
                    <!-- <li>Profile</li> -->
                <!-- </ul> -->
            <!-- </div> -->
        <!-- </nav> -->

    <!-- </header> -->
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