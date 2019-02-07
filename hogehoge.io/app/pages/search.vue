<template>
  <v-app>
    <input type="text" v-model="user_input">
    <p>
      {{ user_input }}
    </p>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      user_input: '',
    }
  }
}
</script>
