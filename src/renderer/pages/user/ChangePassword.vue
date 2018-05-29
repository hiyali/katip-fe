<template>
  <v-container>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-text-field v-model="password" name="password" label="Current password" min="6" value="" prepend-icon="lock_open" :rules="[rules.required, rules.atLeast6]"
                      :append-icon="visible ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (visible = !visible)" :type="visible ? 'text' : 'password'">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-text-field v-model="new_password" name="new-password" label="New password" min="6" value="" prepend-icon="lock" type="password"
                      :rules="[rules.required, rules.atLeast6]">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-text-field v-model="new_password_confirm" name="new-password-confirm" label="New password confirmation" min="6" value="" prepend-icon="lock" type="password"
                      :rules="[rules.required, rules.atLeast6]">
        </v-text-field>
      </v-flex>
    </v-layout>
  
    <v-layout justify-center>
      <v-btn color="primary" @click="save()" :disabled="isLoading || !inputFinished">Save</v-btn>
      <v-btn @click="gotoPage({ name: 'record-list-page' })">Cancel</v-btn>
    </v-layout>
    
    <v-snackbar :timeout="5000" color="error" v-model="snackbar">
      New password and confirmation are not match!
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'change-password-page',
    data () {
      return {
        password: '',
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
        return this.password.length >= 6 && this.new_password.length >= 6 && this.new_password_confirm.length >= 6
      }
    },
    methods: {
      save () {
        const { password, new_password, new_password_confirm } = this

        if (new_password !== new_password_confirm) {
          this.snackbar = true
          return
        }

        this.isLoading = true
        this.changePassword({
          password,
          new_password
        }).then((res) => {
          this.logout().then(_ => {
            this.gotoPage({ name: 'login-page' })
          })
        }).catch(_ => {
          this.isLoading = false
        })
      },
      gotoPage (routeObj) {
        this.$router.replace(routeObj)
      },
      ...mapActions('User', [
        'logout',
        'changePassword'
      ])
    }
  }
</script>

<style>

</style>