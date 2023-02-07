<script>
import VueApexCharts from "vue3-apexcharts";
import { mapState } from "pinia";
import { useDataStore } from "../stores/DataStore";
import { nonDataItems } from "../data/dataService/";
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
          enabled: false,
        },
        yaxis: {
          title: { text: "Aufwendungen" },
          labels: {
            formatter: function (val) {
              return val + "€";
            },
          },
        },
      },
      series: [
        {
          name: "Aufwendungen",
          data: [],
        },
      ],
      itemTitle: "",
    };
  },
  computed: {
    ...mapState(useDataStore, ["expensesPlanned"]),
    ...mapState(useDataStore, ["totalDifferenceExpensesActualExpensesPlanned"]),
    ...mapState(useDataStore, [
      "percentageDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, ["filteredExpensesActual"]),
    ...mapState(useDataStore, ["filteredExpensesPlanned"]),
    ...mapState(useDataStore, [
      "filteredTotalDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, [
      "filteredPercentageDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, ["focusedItem"]),
    ...mapState(useDataStore, ["filtering"]),
  },
  watch: {
    filteredExpensesActual: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    focusedItem: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    filtering: {
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
        this.series = [];
        this.itemTitle = "";
        const nonData = nonDataItems;
        let filteredExpensesActual =
          this.filteredExpensesActual[0][this.focusedItem];
        let filteredExpensesPlanned =
          this.filteredExpensesPlanned[this.focusedItem];
        if (this.filtering !== "Ausreißer") {
          filteredExpensesPlanned =
            this.filteredExpensesPlanned[0][this.focusedItem];
        }

        this.itemTitle = `${filteredExpensesActual.id} ${filteredExpensesActual.title}`;

        let dataItemsActual = [];
        for (const [key, value] of Object.entries(filteredExpensesActual)) {
          if (!nonData.find((i) => i == key)) {
            dataItemsActual.push({
              x: key,
              y: value,
            });
          }
        }

        let dataItemsPlanned = [];
        for (const [key, value] of Object.entries(filteredExpensesPlanned)) {
          if (!nonData.find((i) => i == key)) {
            dataItemsPlanned.push({
              x: key,
              y: value,
            });
          }
        }

        this.series = [
          {
            name: "Planung",
            data: dataItemsPlanned,
          },
          {
            name: "Ist",
            data: dataItemsActual,
          },
        ];

        this.$refs.chart2.updateSeries(this.series, true);
        this.$refs.chart2.updateOptions(this.chartOptions, false, true);
        document.getElementById("back").style["visibility"] = "hidden";
      } catch (err) {}
    },
  },
};
</script>

<template>
  <p class="text-h6 text-blue">
    {{ itemTitle }}
  </p>
  <apexcharts
    height="95%"
    type="bar"
    :options="chartOptions"
    :series="series"
  ></apexcharts>
</template>
