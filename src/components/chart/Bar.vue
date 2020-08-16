<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  name: 'bar',
  props: ['labels','chartData','currency'],
  data () {
    return {
      chartLabel: this.setGraphLabel(),
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const currentData = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return this.currency == 1 ? '$' + currentData : currentData + '円';
            }.bind(this)
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: this.upperData()
              }
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.renderChart(
        {
          labels: this.labels,
          datasets: [
            {
              backgroundColor: this.setGraphColor(),
              data: this.chartData,
              label: this.chartLabel,
            }
          ]
        },
        this.options)
  },
  methods: {
    upperData: function () {
      const maxData = Math.max.apply(null, this.chartData) * 1.2;
      return parseInt(maxData, 10);
    },
    setGraphLabel: function () {
      return this.currency == 1 ? 'Asset transition/USD' : 'Asset transition/円';
    },
    setGraphColor: function () {
      return this.currency == 1 ? 'rgba(137,255,255,1)' : 'rgba(221,238,170,1)';
    }
  }
}
</script>