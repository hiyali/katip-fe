<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app>
      <v-layout justify-center>
        2018 &copy; Katip
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'root-layout'
  }
</script>

<style>

</style>