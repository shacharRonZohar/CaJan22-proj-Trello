<template>
    <section v-close class="action-popup">
        <slot name="header"></slot>
        <slot name="body"></slot>
    </section>
</template>

<script>

export default {
    emits: ['closePopup'],
    // props: [''],
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {
        onClose() {
            console.log('click')
            this.$emit('closePopup')
        }
    },
    computed: {},
    unmounted() { },
}
</script>