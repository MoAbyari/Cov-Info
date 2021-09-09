<template>
  <div class="pie-chart-container">
    <div class= "pie-chart-title">
      <h2>NSW vaccination stats</h2>
    </div>
    <div class="pie-chart-Ellipse2">
      <pie-chart v-if="loaded" :chartData="chartData"></pie-chart>
    </div>
  </div>
</template>

<script>
import PieChart from './PieChart.vue';
import { api } from '../helpers/helpers'

export default {
  name: 'VaccinatedPieChart',
  components: { PieChart },
  data: () => ({
    loaded:false,
    chartData: null
  }),
  async mounted () {
    this.loaded = false
    try {
      const data = await api.getVaccineInfo();
      this.chartData = data
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style>
  .pie-chart-container {
    max-height: 90vh;
    max-width: 90vh;
    margin: 0 auto;
    padding: 20px 29px 7px 29px;
  } 

  .pie-chart-container h2 {
    font-size: 21px;
    text-align: center;
  }

  .pie-chart-title {
    font-size: 21px;
    line-height: 25px;
    margin-top: 0px;

  }
  .pie-chart-Ellipse2 {
    margin-top: -10px;
    margin: 0 auto;


  } 

</style>