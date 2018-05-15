<template>
  <v-layout fill-height justify-center align-center>
    <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'splash-page',
    created () {
      this.checkToken().then((res) => {
        if (res.data.id) {
          this.$router.push({ name: 'record-list-page' })
        } else {
          this.gotoLogin()
        }
      }).catch((_) => {
        this.gotoLogin()
      })
    },
    methods: {
      gotoLogin () {
        this.$router.replace({ name: 'login-page' })
      },
      ...mapActions('User', [
        'checkToken'
      ])
    }
  }
</script>

<style>

</style>
