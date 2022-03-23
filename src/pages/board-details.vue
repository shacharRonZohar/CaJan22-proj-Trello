<template>
    <section class="board-details">
        <ul class="flex clean-list">
            <li v-for="group in board.groups" :key="group.id">
                <board-group :group="group" @saveTask="saveTask"></board-group>
            </li>
        </ul>
        <router-view />
    </section>
</template>

<script>
import boardGroup from "../cmps/board-group.vue";
export default {
    components: {
        boardGroup
    },
        data() {
            return {
                board: null
            }
        },
    created() {

     },
    methods: {
        saveTask({groupId, task}){
            this.$store.dispatch({
                type: 'saveTask',
                taskToSave: task,
                groupId,
                activity: 'Add a new card'
            })
        }
    },
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