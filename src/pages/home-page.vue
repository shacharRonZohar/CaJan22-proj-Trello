<template>
    <section class="home-page main-layout">
        <div class="hero flex">
            <div class="action-call flex">
                <h1 class="hero-title">Twello helps teams move work forward.</h1>
                <p class="hero-p">
                    Collaborate, manage projects,
                    and reach new productivity peaks.
                    From high rises to the home office,
                    the way your team works is
                    unique—accomplish it all with Trello.
                </p>
                <button class="live-demo-btn btn" @click="logAsGuest">Try live demo</button>
            </div>
            <div class="hero-img-container">
                <img class="hero-img" src="../assets/imgs/hero.png" alt="">
            </div>
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