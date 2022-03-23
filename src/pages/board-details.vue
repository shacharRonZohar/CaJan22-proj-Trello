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
        data() {
            return {
                board: null
            }
        },
    created() {

     },
    methods: {},
    computed: {
        boardId(){
            return this.$route.params.boardId
        }
    },
    unmounted() {},
    watch:{
        boardId: {
            handler(){
                const { boardId } = this.$route.params;
                this.$store.commit({type: 'setBoard', boardId })
                this.board = this.$store.getters.board
            },
            immediate: true,
        }
    }
}
</script>