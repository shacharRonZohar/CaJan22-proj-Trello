<template>
  <section v-if="task" class="task-details-container">
    <!-- <div class="clickable-background"></div> -->
    <!-- @input.stop -->
    <header class="task-details-header">
      <h2 @blur="onSaveTitle" class="title" contenteditable spellcheck="false">{{ task.title }}</h2>
      <!-- <img class="btn close" src="../assets/icons/close.svg" /> -->
      <button class="btn close"></button>
    </header>
    <!-- <p class="description">Description</p> -->
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
      },
      immediate: true
    }
  },
  methods: {
    async onSaveTitle(ev) {
      this.task.title = ev.target.innerText
      await this.$store.dispatch({ type: 'saveTask', taskToSave: JSON.parse(JSON.stringify(this.task)) })
      // this.task = await this.$store.dispatch({ type: 'getTaskById', taskId: this.task.id })
      console.log(this.task)
    }
  },
  computed: {
    taskId() {
      return this.$route.params.taskId
    }
  },
  unmounted() { },
}
</script>