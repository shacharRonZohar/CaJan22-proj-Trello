<template>
  <section class="members-tasks-chart">
    <h1></h1>
    <BarChart :chartData="testData" :options="options" />
  </section>
</template>

<script>
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: {
    board: Object,
  },
  components: { BarChart },
  data() {
    return {
      data: [],
    };
  },
  created() {

  },
  computed: {
    testData() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.membersData,
            backgroundColor: [
              "#77CEFF",
              "#0079AF",
              "#123E6B",
              "#97B0C4",
            ],
          },
        ],
      };
    },
    options(){
        return  {
      responsive: true,
      plugins: {
        legend: {
          display: false,  
        },
        title: {
          display: true,
          text: 'Cards per member',
        },
      },
    }

    },
    labels(){
        return this.board.members.map(member => member = member.fullname)
    },

    membersData(){
        // board (members) - groups - tasks - task - members

          return this.board.members.map(member => {
             return this.board.groups.reduce((accGroup, group) => {
                return accGroup += group.tasks.reduce((acc,task) => {
                    if (!task.members) acc += 0 
                    else acc += task.members.filter(taskMember => taskMember._id === member._id).length
                    return acc
                }, 0)
            }, 0)
        })
    }
  },
  methods: {

  },
};
</script>

<style>
</style>