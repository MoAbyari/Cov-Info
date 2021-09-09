
<script>
import { Bar } from 'vue-chartjs';

export default {
   extends: Bar,
   data() {
       const labels = this.$attrs.chartData.map((item) => item.ageGroup);
       const casesBySex = this.$attrs.chartData.map((item) => item.Males + item.Females);

      return {
        chartData: {
          labels: labels,
          datasets: [{
            // label: 'Bar Chart',
            borderWidth: 1,
            pointBorderColor: '#2554FF',
            data: casesBySex,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Cases',
                fontSize: 18,
                // fontStyle: 'bold'
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Age Group',
                fontSize: 18,
                // fontStyle: 'bold'
              },
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
   },
   async mounted() {
        this.renderChart(this.chartData, this.options)
   },
}
</script>

