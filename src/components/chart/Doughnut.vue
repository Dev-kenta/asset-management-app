<script>
import { Doughnut } from 'vue-chartjs'
import * as Palette from 'google-palette'
export default {
  extends: Doughnut,
  name: 'doughnut',
  props: ['labels','chartData'],
  data () {
    return {
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              let label = data.labels[tooltipItem.index] || '';
              return label;
            },
            afterLabel: function (tooltipItem, data) {
              const currentData = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              const total = data.datasets[tooltipItem.datasetIndex].data.reduce((a,x) => a+=x,0);
              const ratio = ((currentData / total) * 100);
              let afterLabel = '$' + currentData;
              afterLabel += '(' + (Math.floor(ratio * 10) / 10) + '%)';
              return afterLabel;
            }
          }
        },
        cutoutPercentage: 30,
      }
    }
  },
  mounted () {
    this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: Palette('mpn65', this.chartData.length).map(
                  function(hex) {
                    return '#' + hex
                  }
              ),
              data: this.chartData,
            }
          ]
        },
        this.options)
  }
}
</script>