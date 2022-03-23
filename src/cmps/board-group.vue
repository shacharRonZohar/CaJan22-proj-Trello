<template>
  <section v-if="group" class="board-group">
    <h1>{{ group.title }}</h1>
    <ul class="clean-list">
      <li v-for="task in group.tasks" :key="task.id">
        <task-preview :task="task" />
      </li>
    </ul>
    <button v-if="!addBtnClicked" @click="addBtnClicked = !addBtnClicked" class="add-card-btn"> + Add a card </button>
    <div class="add-card-container">
        <form @submit.prevent="saveTask">
            <textarea resize:none placeholder="Enter a title for this card..."></textarea>
            <button>Add card</button>
            <span>X</span>
        </form>
    </div>
  </section>
</template>

<script>
import taskPreview from "./task-preview.vue";
export default {
  props: {
    group: {
      type: Object,
    },
  },
  components: {
    taskPreview,
  },
  data() {
    return {
        addBtnClicked: false
    };
  },
  created() {},
  methods: {
    saveTask() {
      this.$emit("saveTask", {
        groupId: this.group.id,
        task: { title: "baba" },
      });
    },
  },
  computed: {},
  unmounted() {},
};
</script>

<style>
</style>