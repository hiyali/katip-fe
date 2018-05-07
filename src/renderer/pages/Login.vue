<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="email" prepend-icon="email" name="email" label="Email" type="email" required validate-on-blur></v-text-field>
              <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" type="password" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="doLogin()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'login-page',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      doLogin () {
        const { email, password } = this
        this.login({ email, password }).then(() => {
          this.$router.replace({ name: 'records-page' })
        }).catch((err) => {
          console.error(err)
        })
      },
      ...mapActions('User', [
        'login'
      ])
    }
  }
</script>

<style>

</style>
