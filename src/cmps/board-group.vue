<template>
  <section v-if="group" class="board-group">
      <h1>{{group.title}}</h1>
      <ul class="clean-list">
          <li v-for="task in group.tasks" :key="task.id">
              <task-preview :task="task"/>
          </li>
      </ul>
      <button @click="saveTask" class="add-card-btn">+ Add a card</button>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue"
export default {
props: {
    group: {
        type: Object
    }  
},
    components: {
        taskPreview
    },
        data() {
            return {
            
            }
        },
    created() {

     },
    methods: {
        saveTask(){
            this.$emit('savetask', {groupId: this.group.id, task: {title: 'baba'}})
        }
    },
    computed: {
        
    },
    unmounted() {},

}
</script>

<style>

</style>