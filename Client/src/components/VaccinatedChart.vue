<template>
  <div>
    <h1> Vaccinated in NSW </h1>
    <div>
      <JSCharting :options="chartOptions" class="columnChart"></JSCharting>
    </div>
  </div>

</template>

<script>
import JSCharting from 'jscharting-vue';

export default {
   name: 'pieChart',
   data() {
      return {
         chartOptions: {
            type: 'pie',
            // title: { label: { text: 'Vaccinated in NSW' },position:'center'},
            legend: {
            position: 'inside bottom',
            // fill: ["red","grey",45]
            },
            series: [
               {
                  name: 'NSW',
                  points: [
                     { x: 'Fully Vaccinated', y: 50,color: "#21d6b6"},
                     { x: 'Received 1st ', y: 30,color: "#456aeb"},
                     { x: 'Non-vaccinated', y: 50,color: "#c442af" }
                  ]

               }
            ]
         }
      }
   },
   components: {
      JSCharting
   }
}
</script>

<style>
.pieChart {
    height: 400px;
}
</style>
