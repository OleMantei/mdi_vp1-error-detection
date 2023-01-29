<script>
import AppContainer from "./components/AppContainer.vue";
import { Scatter } from "vue-chartjs";
import { getFilteredTotalDifferenceExpensesActualExpensesPlanned } from "../src/data/dataService";
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
var minYear;
var maxYear;
// TODO: import needed data as seen in FilterBar Component
export default {
  name: "VisualizationBars",
  components: {
    AppContainer,
    Scatter,
  },

  data() {
    return {
      /*
      Data for the main chart
      */
      chartDataScatter1: {
        datasets: [
          {
            label: "Ausreißerscore XX für",
            borderWidth: 1,
            data: this.parseData(),
            radius: [9],
            backgroundColor: ["#61B544"],
            borderColor: ["#61B544"],
          },
          {
            type: "bar",
            data: this.parseData(),
            barThickness: 1,
          },
        ],
      },
      /*
      Data for the bottom chart
      */
      chartDataScatter2: {
        datasets: [
          {
            label: "No Problems detected",
            borderWidth: 1,
            data: [
              { x: 2010, y: 3 },
              { x: 2011, y: 1 },
              { x: 2012, y: -2 },
              { x: 2013, y: -1 },
              { x: 2014, y: 1 },
              { x: 2015, y: 12 },
              { x: 2016, y: -9 },
            ],
            radius: [9],
            backgroundColor: ["#61B544"],
            borderColor: ["#61B544"],
          },
          {
            label: "Outlier",
            borderWidth: 1,
            data: [{ x: 2017, y: 4 }],
            radius: [9],
            backgroundColor: ["#EB5A5A"],
            borderColor: ["#EB5A5A"],
          },
          {
            type: "bar",
            data: [
              { x: 2010, y: 3 },
              { x: 2011, y: 1 },
              { x: 2012, y: -2 },
              { x: 2013, y: -1 },
              { x: 2014, y: 1 },
              { x: 2015, y: 12 },
              { x: 2016, y: -9 },
              { x: 2017, y: 4 }
            ],
            barThickness: 1,
          },
        ],
      },

      /*
        Customisation-options for the scatter graphs
        */
      chartOptionsScatter: {
        events: ["mouseout", "click", "mousemove", "touchstart", "touchmove", "touchend"],
        onClick: () => {
          console.log("click!")
        },
        plugins: {
          legend: {
            display: false, //disables the legend at the top
          },
        },
        scales: {
          x: {
            ticks: {
              display: false, // disables numbering of the x-axis
            },
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
      },
      yearsSlider: {
        label: "",
        val: 50,
        color: "red",
        backgroundColor: "blue",
      },
      min: minYear,
      max: maxYear,
      range: [minYear, maxYear],
    };
  },
  methods: {
    parseData() {
      const rawValues =
        getFilteredTotalDifferenceExpensesActualExpensesPlanned("total");
      let values = [];
      rawValues.forEach((element) => {
        for (let [key, value] of Object.entries(element)) {
          if (key.length == 4 /*|| key == "title"*/) {
            const xy = { x: Math.floor(key), y: value };
            values.push(xy);
          }
        }
      });
      console.log(values);

      //get smallest xValue
      let allYears = [];
      for (let i=0; i<values.length; i++) {
        var xValue = values[i].x
        allYears.push(xValue);
      }
      console.log(allYears);
      minYear = Math.min(...allYears);
      maxYear = Math.max(...allYears);
      console.log(minYear, maxYear);
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
          ref="scatterMain"
          class="scatterChart"
          :options="chartOptionsScatter"
          :data="chartDataScatter1"
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
                  counter="4"
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
          ref="scatterSub"
          class="scatterChart"
          :options="chartOptionsScatter"
          :data="chartDataScatter2"
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
