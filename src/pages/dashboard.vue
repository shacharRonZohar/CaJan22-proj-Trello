<template>
  <section
    class="dashboard-container"
    :style="{ backgroundImage: `url(${img})`, backgroundColor: `${color}` }"
  >
    <div class="dashboard">
      <header>
        <div class="close-icon" @click="closeDashboard" />
        <h1 class="dashboard-title">{{ board.title }} Dashboard</h1>
      </header>

      <members-tasks-chart :board="board" />
      <task-group-chart :board="board" />
    </div>
  </section>
</template>

<script>
import membersTasksChart from "../cmps/members-tasks-chart.vue";
import taskGroupChart from "../cmps/task-group-chart.vue";

export default {
  components: {
    membersTasksChart,
    taskGroupChart
  },
  data() {
    return {};
  },
  methods: {
    closeDashboard() {
      this.$router.push("/board/" + this.board._id);
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    img() {
      return this.board.style?.imgUrl || "";
    },
    color() {
      return this.board.style.color ? this.board.style.color : "";
    },
  },
};
</script>