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
      Customisation-options for the imported data and how it is displayed
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

        }]
        },

        /*
        Customisation-options for the scatter graphs
        */  
        chartOptionsScatter: {
          plugins: {
            legend: {
    	        display: false //disables the legend at the top
            }
          },       
          scales: {
          x: {
            ticks: {
              display: false,
            },
            grid: {
              display: true,
              drawBorder: false,
              color: function(context) {
                if (context.tick.value == 2) {
                  return ChartJS.defaults.borderColor;
                }
              }
            }
          },
          y: {
            ticks: {
              display: false, //diables the numbering of the y-axis   
            },
            grid: {
              display: true,
              drawBorder: false,
              lineWidth: 2,
              color: function(context) {
                if (context.tick.value == 0) { //only display the line for 0 on the y-axis...
                  return ChartJS.defaults.borderColor; //... in the same color as the border
                }
              }
            }
          },
          },
          responsive: true,
          maintainAspectRatio: false
        },
      
        chartDataScatter2: {
          datasets: [{
            label: 'Data',
            borderWidth: 1,

            data: [{x: 1,y: 3,}, {x: 2,y: 1,}, {x: 3,y: 1,}, {x: 4,y: 12,},{x: 5,y: -2,},{x: 6,y: -1,},{x: 7,y: -9,},{x: 8,y: 4,}],
            radius: [9],
            backgroundColor: ['#61B544'],
            borderColor: ['#61B544'],
          }]
        },




      chartDataBar: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { 
          data: [40, -20, 12],
          backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)'
          ],
          borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)'
          ],
          borderWidth: [
            1
          ],
          barThickness: [
            1
          ]
        } ]
      },
      chartOptionsBar: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            }
          },
          y: {
            grid: {
              display: false,
            }
          },
          },
      }
    }
  }
  
}

</script>


<template>
  <AppContainer>
    <div class="wrapper">
      <div id="main-chart">
        <div class="headline">
          <h3>Alle ausgewählten Ausgabenbereiche - generelle Abweichung</h3>
          <v-btn class="ma-2" color="#2196F3">
            <v-icon>fas fa-list</v-icon>
          </v-btn>
        </div>
        <Scatter
          id="scatterChartTest"
          :options="chartOptionsScatter"
          :data="chartDataScatter1"
        />
      </div>
      <div id="secondary-chart">
        <h3>Auswahl - Abweichung zu den vorherigen Jahren</h3>
        <Scatter
          id="scatterChartTest"
          :options="chartOptionsScatter"
          :data="chartDataScatter2"
        />
      </div>
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
}

.wrapper {
  height: 100%;
  background-color: #F4F4F4;
}

#main-chart {
  height: 50vh;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 70px;
}

#secondary-chart {
  height: 30vh;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 30px;
}
</style>
