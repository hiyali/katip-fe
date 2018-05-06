<template>
  <v-layout fill-height justify-center align-center>
    <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
  </v-layout>
</template>

<script>
  export default {
    name: 'splash-page',
    created () {
      setTimeout(() => {
        this.gotoLogin()
      }, 2000)
    },
    methods: {
      gotoLogin () {
        this.$router.push({ name: 'login-page' })
      }
    }
  }
</script>

<style>

</style>
