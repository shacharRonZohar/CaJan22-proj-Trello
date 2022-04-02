<template>
  <section class="task-group-chart">
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
              "#0079AF",           
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
          text: 'Cards per list',
        },
      },
    }

    },
    labels(){
        return this.board.groups.map(group => group = group.title)
    },

    membersData(){
        return this.board.groups.map(group => {
           return group.tasks.length
        })
        
    }
  },
  methods: {

  },
};
</script>

<style>
</style>