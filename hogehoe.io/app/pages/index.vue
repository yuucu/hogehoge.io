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
      </v-flex>
    </div>
    <div class="section-result">
      {{ isLoading }}
      {{ result }}
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
</style>
