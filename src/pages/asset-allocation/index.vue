<template>
  <Layout>
    <h1>Asset allocation</h1>
    <Doughnut
        :labels="labels"
        :chartData="formatChartData([
            $page.tickersLTS.edges,
            $page.tickersSTS.edges,
            $page.tickersBND.edges,
            $page.tickersCOM.edges,
            $page.tickersCAS.edges
            ])">
    </Doughnut>
  </Layout>
</template>
<page-query>
query{
  tickersLTS: allAssets(order: ASC,filter: {_18:{eq:"Long term stock"}}) {
    edges {
      node {
        _1
        _4
        _8
      }
    }
  }
  tickersSTS: allAssets(order: ASC,filter: {_18:{eq:"Short term stock"}}) {
    edges {
      node {
        _1
        _4
        _8
      }
    }
  }
  tickersBND: allAssets(order: ASC,filter: {_18:{eq:"Bond"}}) {
    edges {
      node {
        _1
        _4
        _8
      }
    }
  }
  tickersCOM: allAssets(order: ASC,filter: {_18:{eq:"Commodities"}}) {
    edges {
      node {
        _1
        _4
        _8
      }
    }
  }
  tickersCAS: allAssets(order: ASC,filter: {_18:{eq:"Cash"}}) {
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
  data() {
    return {
      labels: ['Long term stock', 'Short term stock', 'Bond', 'Commodities', 'Cash']
    }
  },
  methods: {
    formatChartData: function (types) {
      let chartData = [];
      types.forEach(function(type, key){
        const typeSum = type.map(item => item['node']['_4'] * item['node']['_8']).reduce((a,x) => a+=x,0);
        chartData.push(Math.floor(typeSum * 100) / 100);
      });
      return chartData;
    }
  },
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
