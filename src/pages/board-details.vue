<template>
    <section>
        This is board details
        <router-view />
    </section>
</template>

<script>

export default {
    // props: [''],
    components: {},
    created() {
         const { id } = this.$route.params;
        //   const board = ''
     },
    data() {
        return {}
    },
    methods: {},
    computed: {},
    unmounted() { },
}
</script>