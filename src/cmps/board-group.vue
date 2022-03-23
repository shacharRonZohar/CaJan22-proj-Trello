<template>
  <section v-if="group" class="board-group">
      {{group.title}}
      <ul class="flex">
          <li v-for="task in group.tasks" :key="task.id">
              {{task.title}}
          </li>
      </ul>
  </section>
</template>

<script>
export default {
props: {
    group: {
        type: Object
    }  
},
    components: {},
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