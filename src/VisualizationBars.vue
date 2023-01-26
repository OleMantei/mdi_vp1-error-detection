<script>
import AppContainer from "./components/AppContainer.vue";
import { Scatter } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ScatterController, PointElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ScatterController, PointElement)

// TODO: import needed data as seen in FilterBar Component
export default {
  
  name: "VisualizationBars",
  components: {
    AppContainer,
    Scatter

    
},

  data() {
    return {
      /*
      Data for the main chart
      */  
      chartDataScatter1: {
          datasets: [{
            label: 'No Problems detected',
            borderWidth: 1,
            data: [{x: 1,y: 3,}, {x: 2,y: 1,}, {x: 5,y: -2,}, {x: 6,y: -1,}, {x: 8,y: 4,}],
            radius: [9],
            backgroundColor: ['#61B544'],
            borderColor: ['#61B544'],      
          },
        {
          label: "Outlier",
          borderWidth: 1,
          data: [{x: 3,y: 1,}, {x: 4,y: 12,}, {x: 7,y: -9,}],
          radius: [9],
          backgroundColor: ['#EB5A5A'],
          borderColor: ['#EB5A5A'],

        }, 
        {
          type: 'bar',
          data: [{x: 1,y: 3,}, {x: 2,y: 1,}, {x: 5,y: -2,}, {x: 6,y: -1,}, {x: 8,y: 4,}, {x: 3,y: 1,}, {x: 4,y: 12,}, {x: 7,y: -9,}],
          barThickness: 1,
        },
      ]
        },
        /*
        Data for the bottom chart
        */  
        chartDataScatter2: {
          datasets: [{
            label: 'No Problems detected',
            borderWidth: 1,
            data: [{x: 1,y: 3,}, {x: 2,y: 1,}, {x: 5,y: -2,}, {x: 6,y: -1,}, {x: 3,y: 1,}, {x: 4,y: 12,}, {x: 7,y: -9,}],
            radius: [9],
            backgroundColor: ['#61B544'],
            borderColor: ['#61B544'],
          },
          {
          label: "Outlier",
          borderWidth: 1,
          data: [{x: 8,y: 4,}],
          radius: [9],
          backgroundColor: ['#EB5A5A'],
          borderColor: ['#EB5A5A'],
          }, 
          {
          type: 'bar',
          data: [{x: 1,y: 3,}, {x: 2,y: 1,}, {x: 5,y: -2,}, {x: 6,y: -1,}, {x: 8,y: 4,}, {x: 3,y: 1,}, {x: 4,y: 12,}, {x: 7,y: -9,}],
          barThickness: 1,
          },
        ]
        },

        /*
        Customisation-options for the scatter graphs
        */  
        chartOptionsScatter: {
          events: ["mouseout", "touchstart", "touchmove", "touchend"], //disables standard hover effect ("mousemove"), and click ("click")
          plugins: {
            legend: {
    	        display: false //disables the legend at the top
            }
          },   
          scales: {
          x: {
            ticks: {
              display: false, // disables numbers at the bottom
            },
            grid: {
              display: false, //disables the grid in the background
            },
            border: {
              display: false, //disables border at the bottom
            }
          },
          y: {
            ticks: {
              display: false, //diables the numbering of the y-axis   
            },
            grid: {
              display: true,
              lineWidth: 2,
              color: function(context) {
                if (context.tick.value == 0) { //only display the line for 0 on the y-axis...
                  return ChartJS.defaults.borderColor; //... in the same color as the border
                }
              }
            },
            border: {
              display: false, //disables border at the left
            }
          },
          },
          responsive: true,
          maintainAspectRatio: false
        },

        yearsSlider: { label: '', val: 50, color: 'red', backgroundColor: 'blue', },
        min: 2010,
        max: 2020,
        range: [2010, 2020],
        
    }
  }


}
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
          <v-card 
            id="yearsSlider"
            flat
          >
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :tick-labels="years"
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
background-color: #F4F4F4;
}

.headline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3vh;
}

.wrapper {
  height: 100%;
  background-color: #F4F4F4;
}

#main-chart {
  height: 50vh;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 1vw;
  padding: 2vw;
  margin-bottom: 5vh;
}

#secondary-chart {
  height: 30vh;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 1vw;
  padding: 2vw;
}

#yearsSlider {
  display: flex;
  background-color: #FFF;
  width: 30vw;
  padding-left: 30px;
}
.yearsText input{
  color: black !important;
  font-weight: bold;
  opacity: 1;
  background-color: #FFF;
  border-color: #FFF;
}
</style>
