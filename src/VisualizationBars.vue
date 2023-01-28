<script>
import AppContainer from "./components/AppContainer.vue";
import { Scatter } from "vue-chartjs";
import { mapState } from "pinia";
import { useDataStore } from "./stores/DataStore";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ScatterController,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ScatterController,
  PointElement
);

// TODO: import needed data as seen in FilterBar Component
export default {
  name: "VisualizationBars",
  components: {
    AppContainer,
    Scatter,
  },
  data() {
    return {
      yearsSlider: {
        label: "",
        val: 50,
        color: "red",
        backgroundColor: "blue",
      },
      min: 2010,
      max: 2021,
      range: [2010, 2021],
    };
  },
  computed: {
    ...mapState(useDataStore, ["filteredExpensesActual"]),
    ...mapState(useDataStore, ["filteredExpensesPlanned"]),
    ...mapState(useDataStore, [
      "filteredTotalDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, [
      "filteredPercentageDifferenceExpensesActualExpensesPlanned",
    ]),
    chartData() {
      return {
        datasets: [
          {
            label: "No Problems detected",
            borderWidth: 1,
            data: this.parseData(),
            radius: [9],
            backgroundColor: ["#61B544"],
            borderColor: ["#61B544"],
          },
          {
            label: "Outlier",
            borderWidth: 1,
            data: [{ x: 8, y: 4 }],
            radius: [9],
            backgroundColor: ["#EB5A5A"],
            borderColor: ["#EB5A5A"],
          },
          {
            type: "bar",
            data: [{ x: 8, y: 4 }],
            barThickness: 1,
          },
        ],
      };
    },
    chartData2() {
      return {
        datasets: [
          {
            label: "No Problems detected",
            borderWidth: 1,
            data: this.parseData(),
            radius: [9],
            backgroundColor: ["#61B544"],
            borderColor: ["#61B544"],
          },
          {
            label: "Outlier",
            borderWidth: 1,
            data: this.parseData(),
            radius: [9],
            backgroundColor: ["#EB5A5A"],
            borderColor: ["#EB5A5A"],
          },
          {
            type: "bar",
            data: this.parseData(),
            barThickness: 1,
          },
        ],
      };
    },
    chartOptions() {
      return {
        //events: ["mouseout", "touchstart", "touchmove", "touchend"], //disables standard hover effect ("mousemove"), and click ("click")
        plugins: {
          legend: {
            display: false, //disables the legend at the top
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";

                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
          /*interaction: {
            intersect: false,
            mode: "index",
          },*/
        },
        scales: {
          x: {
            ticks: {
              display: true, // disables numbers at the bottom
              stepSize: 1,
            },
            min: 2010,
            max: 2021,
            grid: {
              display: false, //disables the grid in the background
            },
            border: {
              display: false, //disables border at the bottom
            },
          },
          y: {
            ticks: {
              display: false, //diables the numbering of the y-axis
            },
            grid: {
              display: true,
              lineWidth: 2,
              color: function (context) {
                if (context.tick.value == 0) {
                  //only display the line for 0 on the y-axis...
                  return ChartJS.defaults.borderColor; //... in the same color as the border
                }
              },
            },
            border: {
              display: false, //disables border at the left
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    },
  },
  methods: {
    parseData() {
      const rawValues = this.filteredExpensesActual;
      if (rawValues === undefined) {
        return;
      }
      let values = [];
      rawValues.forEach((element) => {
        element.forEach((el) => {
          for (let [key, value] of Object.entries(el)) {
            if (key.length == 4 /*|| key == "title"*/) {
              const xy = { x: Math.floor(key), y: value };
              values.push(xy);
            }
          }
        });
      });
      return values;
    },
  },
};
</script>

<template>
  <AppContainer>
    <div class="wrapper">
      <!-- Start Top Scatterchart -->
      <div id="main-chart">
        <div class="headline">
          <h3>Alle ausgewählten Ausgabenbereiche - generelle Abweichung</h3>
        </div>
        <Scatter
          class="scatterChart"
          :options="chartOptions"
          :data="chartData"
        />
      </div>
      <!-- End Top Scatterchart -->
      <!-- Start Bottom Scatterchart -->
      <div id="secondary-chart">
        <div class="headline">
          <h3>Auswahl - Abweichung zu den vorherigen Jahren</h3>
          <!-- Start Slider -->
          <v-card id="yearsSlider" flat>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              hide-details
              class="align-center"
              color="blue"
            >
              <!-- Start Slider Numbers-->
              <template #append>
                <v-text-field
                  class="yearsText"
                  :value="range[0]"
                  disabled
                  single-line
                  hide-details
                  type="number"
                  style="width: 5vw"
                  @change="$set(range, 0, $event)"
                ></v-text-field>
                <v-text-field
                  class="yearsText"
                  :value="range[1]"
                  disabled
                  single-line
                  hide-details
                  type="number"
                  style="width: 5vw"
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </template>
              <!-- End Slider Numbers-->
            </v-range-slider>
          </v-card>
          <!-- End Slider -->
        </div>
        <Scatter
          class="scatterChart"
          :options="chartOptions"
          :data="chartData2"
        />
      </div>
      <!-- End Bottom Scatterchart -->
    </div>
  </AppContainer>
</template>

<style>
.flex-grow-1 {
  background-color: #f4f4f4;
}

.headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3vh;
}

.wrapper {
  height: 100%;
  background-color: #f4f4f4;
}

#main-chart {
  height: 50vh;
  width: 100%;
  background-color: #ffffff;
  border-radius: 1vw;
  padding: 2vw;
  margin-bottom: 5vh;
}

#secondary-chart {
  height: 30vh;
  width: 100%;
  background-color: #ffffff;
  border-radius: 1vw;
  padding: 2vw;
}

#yearsSlider {
  display: flex;
  background-color: #fff;
  width: 30vw;
  padding-left: 30px;
}
.yearsText input {
  color: black !important;
  font-weight: bold;
  opacity: 1;
  background-color: #fff;
  border-color: #fff;
}
</style>
