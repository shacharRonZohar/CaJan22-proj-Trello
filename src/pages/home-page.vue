<template>
    <section class="home-page">
        <div class="hero">
            <h1 class="hero-title">Twello helps teams move work forward.</h1>
            <p class="hero-p">
                Collaborate, manage projects,
                and reach new productivity peaks.
                From high rises to the home office,
                the way your team works is
                unique—accomplish it all with Trello.
            </p>
            <button @click="logAsGuest">Try live demo</button>
            <img src="../assets/imgs/hero.png" alt="">
        </div>
    </section>
</template>

<script>

export default {
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {
        logAsGuest() {
            console.log('Loggin as guest');
            this.$router.push('/board')
        }
    },
    computed: {},
    unmounted() { },
}
</script>