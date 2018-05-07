<template>
  <div>
    <v-navigation-drawer app :mini-variant.sync="mini" v-model="drawer">
      <img class="logo" src="~@/assets/logo.png" alt="electron-vue">
      <v-list dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar app>
      <v-toolbar-side-icon @click="toggleNavigation()"></v-toolbar-side-icon>
      <v-toolbar-title>Katip</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-toolbar-items class="hidden-sm-and-down">
        <v-text-field v-model="searchKey" prepend-icon="search" type="text" name="search-input" min="2" placeholder="Search" :solo="true" flat></v-text-field>
        
        <v-menu offset-y>
          <v-list-tile class="py-2" slot="activator">
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ userInfo.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-icon>arrow_drop_down</v-icon>
          </v-list-tile>
          
          <v-list>
            <v-list-tile>{{ userInfo.email }}</v-list-tile>
            <v-divider></v-divider>
            <v-list-tile @click.stop="logoutDialog = !logoutDialog">
              <v-list-tile-action>
                <v-icon color="red">power_settings_new</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>
  
    <v-dialog v-model="logoutDialog" max-width="360px">
      <v-card class="py-2">
        <v-card-title class="headline">
          <v-layout justify-center>Are you sure to logout?</v-layout>
        </v-card-title>
        <v-card-actions>
          <v-layout justify-center>
          <v-btn color="primary" @click.native="doLogout()">Sure</v-btn>
          <v-btn color="primary" @click.native="logoutDialog = false" flat>Cancel</v-btn>
          </v-layout>
        </v-card-actions>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'user-layout',
    data () {
      return {
        drawer: false,
        mini: false,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        logoutDialog: false,
        searchKey: ''
      }
    },
    computed: {
      ...mapGetters('User', [
        'userInfo',
        'isLogin'
      ])
    },
    mounted () {
      if (!this.isLogin) {
        this.checkToken().then((res) => {
          if (res.data.id) {
            this.$router.push({ name: 'records-page' })
          } else {
            this.gotoLogin()
          }
        }).catch((_) => {
          this.gotoLogin()
        })
      }
    },
    methods: {
      toggleNavigation () {
        this.drawer = !this.drawer
      },
      doLogout () {
        this.logout().then(() => {
          this.gotoLogin()
        })
      },
      gotoLogin () {
        this.$router.replace({ name: 'login-page' })
      },
      search () {
        console.log('searching...')
      },
      ...mapActions('User', [
        'checkToken',
        'logout'
      ])
    }
  }
</script>

<style>
  .logo {
    height: auto;
    margin: 20px;
    width: calc(100% - 40px);
  }
</style>