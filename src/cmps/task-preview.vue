<template>
  <section v-if="task" class="task-preview">
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
    methods: {},
    computed: {
        
    },
    unmounted() {},

}
</script>

<style>

</style>