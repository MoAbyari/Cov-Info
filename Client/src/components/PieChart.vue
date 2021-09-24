
<script>
import { Pie } from 'vue-chartjs';
import _ from 'lodash';

export default {
   extends: Pie,
   data() {
    const population = 8166000;
    const dose2Population = this.$attrs.chartData.map((i) => {
       return Math.floor(i.dose2_perc * i.population / 100 );
     });
    const dose2 = _.sum(dose2Population) 
    const dose1 = this.$attrs.chartData.reduce((n, {dose1_count}) => n + dose1_count, 0);
    const dose1perc = Math.floor(dose1 / population * 100);
    const dose2perc = Math.floor(dose2 / population * 100);
    const nonVaccinated = Math.floor((population - (dose1 + dose2)) / population * 100);
   console.log(dose2Population);

      return {
        chartData: {
          labels: ["Non-Vaccinated (%)", "Fully Vaccinated (%)", "1st Dose-Vaccinated (%)"
          ],
          datasets: [{
            label: 'Pie Chart',
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132,0.7)',
              'rgba(54, 162, 235,0.7)',
              'rgba(255, 206, 86,0.7)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            pointBorderColor: '#2554FF',
            data: [nonVaccinated,dose2perc,dose1perc]
          }]
        },
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          layout:{
            padding: 15
          },
          responsive: true,
          maintainAspectRatio: false,
        }

      }
   },
   async mounted () {
      this.renderChart(this.chartData, this.options);
   },
}
</script>

