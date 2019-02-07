<template>
  <div class="wrapper">
    <div class="section-search" v-bind:class="{'has-result': has_host != ''}">
      <v-flex xs10 sm8>
        <h3 class="display-1">hogehoge.io</h3>
        <p>Search how many keywords is used in github code.</p>
        <v-text-field
          flat
          prepend-icon="search"
          label="Search function name or variable name"
          v-model="user_input"
          v-on:keyup.enter="search"
          type="text"
        >
        </v-text-field>
        <div class="text-xs-center hidden-sm-and-up">
          <v-btn color="info">Search</v-btn>
        </div>
      </v-flex>
    </div>
    <div class="section-result">
      {{ result }}
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
export default {
  components: {
  },
  data() {
    return {
      user_input: '',
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    result() {
      return this.$store.state.github.result
    },
    has_host() {
      return this.result != ''
    }
  },
  methods: {
    search() {
      this.$store.dispatch('github/search', {keywords: this.user_input})
    },
    closeLayer() {
      this.$store.commit('setIsLoading', { flag: false });
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
}
.section-search {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.has-result {
  height: 40vh;
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
</style>
