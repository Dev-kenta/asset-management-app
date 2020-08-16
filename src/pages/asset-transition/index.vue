<template>
  <Layout>
    <h1>Asset transition</h1>
    <div class="switch">
      <input type="radio" id="usd" value="1" v-model="currency">
      <label for="usd">USD</label>
      <input type="radio" id="yen" value="2" v-model="currency">
      <label for="yen">円</label>
    </div>
    <bar v-show="showUsd" :currency="1" :labels="formatLabels($page.transitionUsd.edges)" :chartData="formatChartData($page.transitionUsd.edges, 1)"></bar>
    <bar v-show="!showUsd" :currency="2" :labels="formatLabels($page.transitionYen.edges)" :chartData="formatChartData($page.transitionYen.edges, 2)"></bar>
  </Layout>
</template>
<page-query>
query {
  transitionUsd: allTransitions(order:ASC) {
    edges {
      node {
        date
        asset_usd
      }
    }
  }
  transitionYen: allTransitions(order:ASC) {
    edges {
      node {
        date
        asset_yen
      }
    }
  }
}
</page-query>
<script>
import Bar from "../../components/chart/Bar";
export default {
  components: {
    Bar
  },
  data() {
    return {
      defaultCurrency: "1",
      showUsd: true
    }
  },
  methods: {
    formatLabels: function (labels) {
      return labels.map(item => item['node']['date']);
    },
    formatChartData: function (chartData, type) {
      return type == 1 ? chartData.map(item => item['node']['asset_usd']) : chartData.map(item => item['node']['asset_yen']);
    }
  },
  computed: {
    currency: {
      get () {
        return this.defaultCurrency;
      },
      set (value) {
        this.defaultCurrency = value;
        this.showUsd = value == 1 ? true : false;
      }
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
