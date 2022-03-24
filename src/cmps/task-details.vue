<template>
  <section v-if="task" class="task-details-container">
    <!-- <div class="clickable-background"></div> -->
    <!-- @input.stop -->
    <header class="task-details-header">
      <!-- <div class="title-container"> -->
      <div class="icon"></div>
      <div class="title-container">
        <h2 @blur="onSaveTitle" class="title" contenteditable spellcheck="false">{{ task.title }}</h2>
        <small class="group-txt">in list: Test</small>
      </div>
    </header>
    <main class="main-details">
      <section class="main-content">
        <div class="members-container task-layout">
          Members:
          <div class="members">
            <div class="member">A</div>
            <div class="member">CB</div>
            <div class="member">SZ</div>
            <div class="member add icon"></div>
          </div>
        </div>
        <div class="desc-container">
          <div class="desc-header">
            <div class="icon"></div>
            <h3>Description</h3>
          </div>
          <div class="desc task-layout">Add a more detailed description...</div>
          <!-- <button class="btn edit">Edit</button> -->
        </div>
        <div class="activities-container">
          <div class="activities-header">
            <div>
              <div class="icon"></div>
              <h3>Activity</h3>
            </div>
            <button class="btn show">Show details</button>
          </div>
        </div>
      </section>
      <aside class="actions"></aside>
    </main>
    <button @click="onCloseDetails" class="btn close icon"></button>
    <!-- <p class="description">Description</p> -->
  </section>
</template>

<script>
export default {
  props: {
    groupId: String
  },
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
          this.task = await this.$store.dispatch({ type: 'getTaskById', taskId, groupId: this.groupId })
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
      await this.$store.dispatch({ type: 'saveTask', taskToSave: JSON.parse(JSON.stringify(this.task)), groupId: this.groupId })
      // this.task = await this.$store.dispatch({ type: 'getTaskById', taskId: this.task.id })
      console.log(this.task)
    },
    onCloseDetails() {
      const currRoute = this.$route.fullPath
      const route = currRoute.substring(0, currRoute.indexOf('task'))
      this.$router.push(route)
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