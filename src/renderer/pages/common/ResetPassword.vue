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
  
    <v-snackbar :timeout="5000" color="error" v-model="snackbar">
      New password and confirmation are not match!
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
        email: '',
        new_password: '',
        new_password_confirm: '',

        isLoading: false,
        snackbar: false,
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
    methods: {
      reset () {
        const { new_password, new_password_confirm } = this

        if (new_password !== new_password_confirm) {
          this.snackbar = true
          return
        }

        this.isLoading = true
        this.resetPassword({
          new_password
        }).then((res) => {
          this.gotoPage({ name: 'login-page' })
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