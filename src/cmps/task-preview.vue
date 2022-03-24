<template>
  <section v-if="task" class="task-preview" @click="openTaskDetails">
        <h2>{{task.title}}</h2>
  </section>
</template>

<script>
export default {
props: {
    task: {
        type: Object
    }  
    },
    components: {

    },
        data() {
            return {
            
            }
        },
    created() {

     },
    methods: {
        openTaskDetails(){
            this.$router.push(this.$route.fullPath + '/task/' + this.task.id)
            this.$emit('openTaskDetails')
        }
    },
    computed: {
        
    },
    unmounted() {},

}
</script>

<style>

</style>