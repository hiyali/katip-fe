<template>
  <common-layout>
    <template slot="title">Login</template>
    
    <v-form>
      <v-text-field v-model="email" prepend-icon="email" name="email" label="Email" type="email" :rules="[rules.required, rules.email]" required></v-text-field>
      <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" type="password" :rules="[rules.required, rules.password]" min="6" required
                    @keyup.enter="doLogin()">
      </v-text-field>
    </v-form>

    <v-btn slot="support-link" flat @click="gotoPage({ name: 'forget-password-page' })">Forget password?</v-btn>

    <template slot="buttons">
      <v-btn color="primary" @click="doLogin()" :disabled="isLoading">Login</v-btn>
      <v-btn flat @click="gotoPage({ name: 'register-page' })">Register</v-btn>
    </template>
  
    <v-snackbar :timeout="5000" color="error" v-model="snackbar">
      Please input right informations.
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </common-layout>
</template>

<script>
  import { mapActions } from 'vuex'
  import { Validation } from '@/lib'
  
  export default {
    name: 'login-page',
    data () {
      return {
        isLoading: false,
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

        this.isLoading = true
        this.login({ email, password }).then(() => {
          this.$router.replace({ name: 'record-list-page' })
        }).catch(_ => {
          this.isLoading = false
        })
      },
      gotoPage (routeObj) {
        this.$router.push(routeObj)
      },
      ...mapActions('User', [
        'login'
      ])
    }
  }
</script>

<style>

</style>
