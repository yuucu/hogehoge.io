<template>
  <div class="wrapper">
     <v-alert
      :value="hasError"
      color="error"
      icon="warning"
      dismissible
      outline
      transition="fade-transition"
    >
      {{ error.error }}
    </v-alert>

    <div class="section-search" v-bind:class="{'has-result': hasResult}">
      <v-flex xs10 sm8>
        <div v-if="!hasResult">
          <h3 class="display-1">hogehoge.io</h3>
          <p>
            Search how many keywords is used in github code.
          </p>
        </div>
        <v-text-field
          flat
          prepend-icon="search"
          label="e.g. foo bar baz"
          v-model="user_input"
          v-on:keyup.enter="search"
          type="text"
        >
        </v-text-field>
        <div class="text-xs-center hidden-sm-and-up">
          <v-btn color="info" v-on:click="search">Search</v-btn>
        </div>

      </v-flex>
    </div>
    <div class="section-result">

      <div v-if="hasResult">


        <div class="chart-area">

          <v-flex xs10 sm6 md5 my-4>
            <v-card>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile v-for="res in result" :key="res.keyword">
                  <v-list-tile-content>{{ res.keyword }}: </v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ res.total_count }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>

          <v-flex xs10 sm6>
            <pie-chart :chart-data="getChartData" :options="options"></pie-chart>
          </v-flex>
        </div>

        <v-tabs
          color="#555"
          v-model="getFirstKey"
          dark
          grow
        >
          <v-tab
            class="my-v-tab"
            v-for="res in result"
            :key="res.keyword"
            :href="'#tab-' + res.keyword"
          >
          {{ res.keyword }}
          </v-tab>
           <v-tabs-items v-model="result">

            <v-tab-item
              v-for="res in result"
              :key="res.keyword"
              :value="'tab-' + res.keyword"
            >
              <v-card flat>
                <v-card-text>
                  <h4 class="display-1 font-weight-thin card-title">
                    <span class="font-italic under-line">{{ res.keyword }}</span>
                    <span class="body-1"> # {{ res.total_count }}</span>
                  </h4>

                  <v-data-table
                      :headers="headers"
                      :items="res.items"
                      class="elevation-1"
                    >
                    <template slot="items" slot-scope="props">
                      <td class="text-xs-right">
                        {{ props.item.repository.full_name }}
                      </td>
                      <td class="text-xs-right">
                        <a v-bind:href=" props.item.html_url" target="_blank">
                          {{ props.item.path }}
                        </a>
                      </td>
                    </template>
                  </v-data-table>

                </v-card-text>
              </v-card>



            </v-tab-item>
          </v-tabs-items>

        </v-tabs>
      </div>

    </div>

    <div
      id="page-layer"
      v-if="isLoading"
      v-on:click="closeLayer"
    >
      <v-progress-circular
        class="loading-animation"
        color="info"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>

</template>

<script>

import { mapGetters } from 'vuex'
import PieChart from '@/components/PieChart.vue'
import 'chartjs-plugin-labels'

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      user_input: '',
      headers: [
        { text: 'Repository', sortable: false, align: 'center', value: 'repository' },
        { text: 'file path', sortable: false, align: 'center', value: 'path' },
      ],
      // グラフオプション
      options: {
        responsive: true,
        plugins: {
          labels: {
            render: function(ele) {
              return ele.label + ' - ' + ele.value
            },
            fontSize: 14,
            fontColor: "#000",
            // position: "outside"
          }
        }
      }

    }
  },
  computed: {
    ...mapGetters([
      'isLoading',
    ]),
    result() {
      return this.$store.getters['github/result']
    },
    error() {
      return this.$store.getters['github/error']
    },
    hasResult() {
      return this.$store.getters['github/hasResult']
    },
    hasError() {
      return this.$store.getters['github/hasError']
    },
    getFirstKey() {
      return this.$store.getters['github/getFirstKey']
    },
    getChartData() {
      return this.$store.getters['github/getChartData']
    },

  },
  methods: {
    search() {
      var keywords = this.user_input.replace(/\s+/g, ' ').split(' ')
      var keywords_perfect = []
      keywords_perfect = keywords.filter(function(element, index, self) {
        if(element !== '') {
          return self.indexOf(element) === index
        }
      })
      // console.log(keywords_perfect)
      this.$store.dispatch('github/search', {keywords: keywords_perfect})
    },
    closeLayer() {
      this.$store.commit('setIsLoading', { flag: false });
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  .section-search {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .has-result {
    height: 24vh;
  }

  .section-result {
    .my-v-tab {
      text-transform: none;
    }
    .card-title {
      margin-left: 8px;
    }
    .chart-area {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 32px;
    }
  }

  #page-layer {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(200,200,200,0.4);
    z-index: 3;
    .loading-animation {
      position: fixed;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
      -o-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);

    }
  }
}

</style>
