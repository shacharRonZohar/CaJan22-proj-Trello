<template>
    <header class="main-header" :class="homeHeader">
        <div class="logo">Twello</div>
        <nav class="main-nav-container">
            <ul>
                <router-link class="login-link">login</router-link>
                <router-link class="create-board">create</router-link>
            </ul>
        </nav>
    </header>
</template>

<script>

export default {
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {

    },
    unmounted() { },
}
</script>