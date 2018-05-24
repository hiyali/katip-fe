<template>
  <v-container>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-text-field name="user-email" label="Email" :value="userInfo.email" :disabled="true" prepend-icon="email" type="text"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-text-field v-model="name" name="user-name" label="Name" prepend-icon="account_box" type="text" :rules="[rules.required, rules.atLeast2]"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-text-field v-model="avatarUrl" name="avatar-url" label="Avatar url" prepend-icon="link" type="text" :rules="[rules.webImage]"></v-text-field>
      </v-flex>
    </v-layout>
    
    <v-layout justify-center>
      <v-btn color="primary" @click="save()" :disabled="isLoading">Save</v-btn>
      <v-btn @click="gotoPage({ name: 'record-list-page' })">Cancel</v-btn>
    </v-layout>
    
    <v-snackbar :timeout="5000" color="error" v-model="snackbar">
      Please input right informations!
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Validation } from '@/lib'

  export default {
    name: 'user-edit-page',
    data () {
      return {
        name: '',
        avatarUrl: '',

        isLoading: false,
        snackbar: false,

        rules: {
          required: (value) => !!value || 'Required.',
          atLeast2: (value) => value.trim().length >= 2 || 'At least 2.',
          webImage: (value) => {
            return !value || Validation.webImage(value) || 'Invalid web image url.'
          }
        }
      }
    },
    computed: {
      ...mapGetters('User', [
        'userInfo'
      ])
    },
    mounted () {
      this.name = this.userInfo.name
      this.avatarUrl = this.userInfo.avatar_url
    },
    methods: {
      save () {
        const { name, avatarUrl } = this

        if (name.trim().length < 2 || !Validation.webImage(avatarUrl)) {
          this.snackbar = true
          return
        }

        this.isLoading = true
        this.updateInfo({
          name,
          avatarUrl
        }).then(_ => {
          this.gotoPage({ name: 'record-list-page' })
        }).catch(_ => {
          this.isLoading = false
        })
      },
      gotoPage (routeObj) {
        this.$router.replace(routeObj)
      },
      ...mapActions('User', [
        'updateInfo'
      ])
    }
  }
</script>

<style>

</style>