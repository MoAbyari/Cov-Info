<template>
  <div class="container">
    <div>
       <h2>Cases by age group</h2>
    <bar-chart v-if="loaded" :chartData="chartData"></bar-chart>
    </div>
  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'CasesBarChart',
  components: { BarChart },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  async mounted () {
    this.loaded = false
    try {
      const data = await api.getCasesByAge();
      this.chartData = data
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #0058A9;
  padding: 60px 29px 30px 29px;
}

.container div {
  background-color: white;
  padding: 20px 5px;
  border-radius: 15px;
}

.container h2 {
  font-size: 21px;
  text-align: center;
  margin-top: 25px;
}
</style>

