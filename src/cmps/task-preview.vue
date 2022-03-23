<template>
  <section v-if="group" class="board-group">
      {{group.title}}
      <ul>
          <li v-for="task in group.tasks" :key="task.id">

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