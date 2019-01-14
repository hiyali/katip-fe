<template>
  <common-layout>
    <template slot="title">Reset password</template>
    
    <v-text-field v-model="email" name="email" label="Email address" min="6" value="" prepend-icon="email" type="email" :disabled="true"></v-text-field>
    <v-text-field v-model="new_password" name="new-password" label="New password" min="6" value="" prepend-icon="lock" type="password"
                  :rules="[rules.required, rules.atLeast6]">
    </v-text-field>
    <v-text-field v-model="new_password_confirm" name="new-password-confirm" label="New password confirmation" min="6" value="" prepend-icon="lock" type="password"
                  :rules="[rules.required, rules.atLeast6]">
    </v-text-field>
    
    <template slot="buttons">
      <v-btn color="primary" @click="reset()" :disabled="isLoading || !inputFinished">Reset</v-btn>
      <v-btn @click="$router.back()">Cancel</v-btn>
    </template>
  
    <v-snackbar :timeout="5000" :color="snackbarColor" v-model="snackbar">
      {{ snackbarText }}
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </common-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'reset-password-page',
    data () {
      return {
        token: '',
        email: '',
        new_password: '',
        new_password_confirm: '',

        isLoading: false,
        snackbar: false,
        snackbarText: '',
        snackbarColor: '',
        visible: false,

        rules: {
          required: (value) => !!value || 'Required.',
          atLeast6: (value) => value.length >= 6 || 'At least 6.'
        }
      }
    },
    computed: {
      inputFinished () {
        return this.new_password.length >= 6 && this.new_password_confirm.length >= 6
      }
    },
    mounted () {
      this.email = this.$route.params.query.email // TODO
      this.token = this.$route.params.query.token
    },
    methods: {
      reset () {
        const { token, new_password, new_password_confirm } = this

        if (new_password !== new_password_confirm) {
          this.snackbarText = 'New password and confirmation are not match!'
          this.snackbarColor = 'error'
          this.snackbar = true
          return
        }

        this.isLoading = true
        this.resetPassword({
          token,
          new_password
        }).then((_) => {
          this.snackbarText = 'Reset password success!'
          this.snackbarColor = 'info'
          this.snackbar = true
          setTimeout(() => {
            this.gotoPage({name: 'login-page'})
          }, 5000)
        }).catch(_ => {
          this.isLoading = false
        })
      },
      gotoPage (routeObj) {
        this.$router.push(routeObj)
      },
      ...mapActions('User', [
        'resetPassword'
      ])
    }
  }
</script>

<style>

</style>