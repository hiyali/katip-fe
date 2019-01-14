<template>
  <common-layout>
    <template slot="title">Forget password</template>
    
    <v-form>
      <v-text-field v-model="email" prepend-icon="email" name="email" label="Email" type="email" :rules="[rules.required, rules.email]" required></v-text-field>
    </v-form>

    <template slot="buttons">
      <v-btn color="primary" @click="send()" :disabled="isLoading">Confirm</v-btn>
      <v-btn flat @click="$router.back()">Cancel</v-btn>
    </template>
    
    <v-snackbar :timeout="5000" :color="snackbarColor" v-model="snackbar">
      {{ snackbarText }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </common-layout>
</template>

<script>
  import { mapActions } from 'vuex'
  import { Validation } from '@/lib'
  
  export default {
    name: 'forget-password-page',
    data () {
      return {
        isLoading: false,
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',

        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            return Validation.email(value) || 'Invalid e-mail.'
          }
        },
        email: ''
      }
    },
    methods: {
      send () {
        const { email } = this
        if (!Validation.email(email)) {
          this.snackbarText = 'Please input right email address.'
          this.snackbarColor = 'error'
          this.snackbar = true
          return
        }

        this.isLoading = true
        this.sendResetPasswordEmail({ email }).then(() => {
          this.snackbarText = 'An email with reset password was sent.'
          this.snackbarColor = 'info'
          this.snackbar = true
          setTimeout(() => {
            this.gotoPage({ name: 'reset-password-page' })
          }, 5000)
        }).catch(_ => {
          this.isLoading = false
        })
      },
      gotoPage (routeObj) {
        this.$router.push(routeObj)
      },
      ...mapActions('User', [
        'sendResetPasswordEmail'
      ])
    }
  }
</script>

<style>

</style>
