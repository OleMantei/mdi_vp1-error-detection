<script>
import VueApexCharts from "vue3-apexcharts";
import { mapState } from "pinia";
import { useDataStore } from "../stores/DataStore";
export default {
  name: "ChartOutlier",
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "basic-bar",
        },
        dataLabels: {
          formatter: function (val) {
            return val + "%";
          },
        },
        yaxis: {
          title: { text: "Ausreißerwahrscheinlichkeit" },
          min: 0,
          max: 100,
          labels: {
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
      series: [
        {
          name: "Ausreißerscore",
          data: [],
        },
      ],
    };
  },
  computed: {
    ...mapState(useDataStore, {
      filteredExpensesActual: (state) => state.filteredExpensesActual,
      filteredExpensesPlanned: (state) => state.filteredExpensesPlanned,
      filteredTotalDifferenceExpensesActualExpensesPlanned: (state) =>
        state.filteredTotalDifferenceExpensesActualExpensesPlanned,
      filteredPercentageDifferenceExpensesActualExpensesPlanned: (state) =>
        state.filteredPercentageDifferenceExpensesActualExpensesPlanned,
      focusedItem: (state) => state.focusedItem,
    }),
  },
  watch: {
    filteredExpensesActual: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  created() {
    this.updateChart();
  },
  methods: {
    updateChart() {
      try {
        let dataItems = [];
        this.filteredExpensesActual[0].forEach((i) => {
          dataItems.push({
            x: [i.id, i.title],
            y: i.outlierScore,
            fillColor: i.outlierScoreColor,
          });
        });

        this.series = [
          {
            name: "Ausreißerwahrscheinlichkeit",
            data: dataItems,
          },
        ];

        this.$refs.chart2.updateSeries(this.series, true);
        this.$refs.chart2.updateOptions(this.chartOptions, false, true);
        document.getElementById("back").style["visibility"] = "hidden";
      } catch (err) {}
    },
    clickHandler(event, chartContext, config) {
      const dataStore = useDataStore();
      let itemIndex = config.dataPointIndex;
      dataStore.changeFocusedItem(itemIndex);
    },
  },
};
</script>

<template>
  <apexcharts
    height="100%"
    type="bar"
    :options="chartOptions"
    :series="series"
    @click="clickHandler"
  ></apexcharts>
</template>
