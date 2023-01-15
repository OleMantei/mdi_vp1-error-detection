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
      chartDataScatter1: {
          datasets: [{
            label: 'Data',
            borderWidth: 1,

            data: [{x: 1,y: 3,}, {x: 2,y: 1,}, {x: 3,y: 1,}, {x: 4,y: 12,}, {x: 5,y: -2,}, {x: 6,y: -1,},{x: 7,y: -9,}, {x: 8,y: 4,}],
            radius: [9],
            backgroundColor: ['#1ed44e'],
            borderColor: ['#1ed44e'],
            fill: [true],
          }]
        },

        chartOptionsScatter: {
          scales: {
          x: {
            grid: {
              display: false,
            }
          },
          y: {
            ticks: {
              display: false,               
            },
            grid: {
              display: false,
              drawTicks: false,
            }
          },
          },
          legend: {
            display: false
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
            backgroundColor: ['#1ed44e', '#aa00000', '#1ed44e','#1ed44e','#1ed44e','#1ed44e','#1ed44e','#1ed44e'],
            borderColor: ['#1ed44e'],
            fill: [true],
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
        <Scatter
          id="scatterChartTest"
          :options="chartOptionsScatter"
          :data="chartDataScatter1"
        />
      </div>
      <div id="secondary-chart">
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
background-color: #F8F8FB;
}
.wrapper {
  height: 100%;
  background-color: #F8F8FB;
}

#main-chart {
  height: 50vh;
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 10px;
  margin-bottom: 30px;
}

#secondary-chart {
  height: 30vh;
  width: 100%;
  background-color: #FFFFFF;
}
</style>
