<template>
  <Layout>
    <h1>Portfolio</h1>
    <Doughnut :labels="formatLabels($page.tickers.edges)" :chartData="formatChartData($page.tickers.edges)"></Doughnut>
  </Layout>
</template>
<page-query>
query {
  tickers: allAssets(order: ASC,filter: {_0:{eq:"米国株式"}}) {
    edges {
      node {
        _1
        _4
        _8
      }
    }
  }
}
</page-query>
<script>
import Doughnut from "../../components/chart/Doughnut"
export default {
  components: {
    Doughnut
  },
  methods: {
    formatLabels: function (labels) {
      return labels.map(item => item['node']['_1']);
    },
    formatChartData: function (chartData) {
      return chartData.map(item => item['node']['_4'] * item['node']['_8']);
    }
  },
  metaInfo : {
    title: 'Hello, world!'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
