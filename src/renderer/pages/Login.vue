<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
  
            <v-snackbar :timeout="5000" color="error" :vertical="true" v-model="snackbar">
              Please input right informations.
              <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
            </v-snackbar>
            
            <v-form>
              <v-text-field v-model="email" prepend-icon="email" name="email" label="Email" type="email" :rules="[rules.required, rules.email]" required></v-text-field>
              <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" type="password" :rules="[rules.required, rules.password]" min="6" required></v-text-field>
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
  import { Validation } from '@/lib'
  
  export default {
    name: 'login-page',
    data () {
      return {
        snackbar: false,
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            return Validation.email(value) || 'Invalid e-mail.'
          },
          password: (value) => {
            return Validation.password(value) || 'Must greater than 6.'
          }
        },
        email: '',
        password: ''
      }
    },
    methods: {
      doLogin () {
        const { email, password } = this
        if (!Validation.email(email) || !Validation.password(password)) {
          this.snackbar = true
          return
        }
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
