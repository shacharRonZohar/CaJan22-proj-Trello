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
        //  const { boardId } = this.$route.params;
        //  this.$store.commit({type: 'setBoard', boardId })
        //  this.board = this.$store.getters.board
        //  console.log(this.board);
     },
    methods: {},
    computed: {},
    unmounted() {},
    watch:{
        'this.$route.params.boardId':{
            handler(){
                const { boardId } = this.$route.params;
                this.$store.commit({type: 'setBoard', boardId })
                this.board = this.$store.getters.board
                console.log(this.board);
            },
            immediate: true
        }
    }
}
</script>