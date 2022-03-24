<template>
    <section class="action-popup">
        <slot name="header"></slot>
        <hr />
        <slot name="body"></slot>
    </section>
</template>

<script>

export default {
    // props: [''],
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
    unmounted() { },
}
</script>