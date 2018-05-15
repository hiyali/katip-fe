<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-model="name" prepend-icon="account_box" name="name" label="Name" type="text" :rules="[rules.required]" required></v-text-field>
              <v-text-field v-model="email" prepend-icon="email" name="email" label="Email" type="email" :rules="[rules.required, rules.email]" required></v-text-field>
              <v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" type="password" :rules="[rules.required, rules.password]" min="6" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="doRegister()">Register</v-btn>
            <v-btn flat @click="gotoLogin()">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  
    <v-snackbar :timeout="5000" color="error" :vertical="true" v-model="snackbar">
      Please input right informations.
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
    
    <v-dialog v-model="registerConfirmDialog" max-width="360px">
      <v-card class="py-2">
        <v-card-title class="headline">
          <v-layout justify-center>An email send to your address!</v-layout>
        </v-card-title>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn color="primary" @click.native="registerConfirmDialog = false" flat>OK</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'
  import { Validation } from '@/lib'
  
  export default {
    name: 'register-page',
    data () {
      return {
        registerConfirmDialog: false,
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
        name: '',
        email: '',
        password: ''
      }
    },
    methods: {
      doRegister () {
        const { name, email, password } = this
        if (!Validation.email(email) || !Validation.password(password)) {
          this.snackbar = true
          return
        }
        this.register({ name, email, password }).then(() => {
          this.registerConfirmDialog = true
          this.$router.push({ name: 'login-page', query: { email } })
        }).catch((err) => {
          console.error(err)
        })
      },
      gotoLogin () {
        this.$router.replace({ name: 'login-page' })
      },
      ...mapActions('User', [
        'register'
      ])
    }
  }
</script>

<style>

</style>
