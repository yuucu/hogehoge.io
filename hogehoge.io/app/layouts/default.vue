<template>
  <v-app v-bind:dark="app_dark">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-and-down">

        <v-btn flat>no link</v-btn>


        <v-btn
          nuxt
          to="/"
          flat
          icon
        >
          <v-icon>search</v-icon>
        </v-btn>

        <v-btn icon v-on:click="app_dark = !app_dark">
          <v-icon>invert_colors</v-icon>
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      height="80"
    >
      <v-layout
        justify-center
       >
        <span><a class="caption" href="https://satokibi.netlify.com" target="_blank">&copy; 2019 satokibi</a></span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      app_dark: false,
      items: [
        {
          icon: 'home',
          title: 'home',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'hogehoge.io'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
