<template>
  <section v-if="task" class="task-details">
    <textarea v-model="task.title" class="title" autoResizeEnabled="true"></textarea>
    <!-- <title>{{ task?.title }}</title> -->
  </section>
</template>

<script>
export default {
  components: {},
  created() { },
  data() {
    return {
      task: null
    }
  },
  watch: {
    taskId: {
      async handler() {
        try {
          const taskId = this.$route.params.taskId
          this.task = await this.$store.dispatch({ type: 'getTaskById', taskId })
        } catch (err) {
          console.log(err)
        }
        // groups.find(group => {
        //   const currTask = group.tasks.find(task => task.id === taskId)
        //   if (currTask) return task = currTask
        // }, {})
      },
      immediate: true
    }
  },
  methods: {},
  computed: {
    taskId() {
      return this.$route.params.taskId
    }
  },
  unmounted() { },
}
</script>