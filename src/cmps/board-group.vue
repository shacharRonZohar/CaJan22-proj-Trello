<template>
  <section v-if="group" class="board-group">
      <h1>{{group.title}}</h1>
      <ul class="clean-list">
          <li v-for="task in group.tasks" :key="task.id">
              <h2>{{task.title}}</h2>
          </li>
      </ul>
      <button class="add-card-btn">Add card</button>
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