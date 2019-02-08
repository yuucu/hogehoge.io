<template>
  <div class="small">
    <v-btn color="primary" v-on:click="fillData">Randomize</v-btn>
    <pie-chart :chart-data="datacollection" :options="options"></pie-chart>
  </div>
</template>

<script>
  import PieChart from '@/components/PieChart.vue'
  import "chartjs-plugin-labels";

  export default {
    components: {
      PieChart
    },
    data () {
      return {
        datacollection: null,
        options: {
          plugins: {
            labels: {
              render: function(ele) {
                // return ele.dataset.data[ele.index]
                // return ele.value
                console.log(ele)
                return ele.value
              },
                      fontSize: 14,
              fontColor: "#000",
              position: "outside"
            }
          }
        }
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: [1,2,3,4],
          datasets: [
            {
              // data: [this.getRandomInt(), this.getRandomInt()]
              label: '藩と人口',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
              backgroundColor: [
                'rgba(255, 100, 130, 0.2)',
                'rgba(100, 130, 255, 0.2)',
                'rgba(130, 255, 100, 0.2)',
                'rgba(230, 210, 85, 0.2)'
              ]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>

