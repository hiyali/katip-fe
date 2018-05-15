<template>
  <v-container>
    <v-navigation-drawer app :mini-variant.sync="mini" v-model="drawer">
      <v-list subheader dense>
        <img v-show="!mini" class="logo" src="~@/assets/images/logo.png" alt="electron-vue">
  
        <v-divider></v-divider>
        <v-list-tile @click="gotoPage({ name: 'record-list-page' })">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Record list</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
  
        <v-divider></v-divider>
        <v-subheader>Other</v-subheader>
        <v-list-tile @click="mini = !mini">
          <v-list-tile-action>
            <v-icon>{{ mini ? 'more_horiz' : 'more_vert' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mini mode</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="gotoPage({ name: 'about-page' })">
          <v-list-tile-action>
            <v-icon>contacts</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar app>
      <v-toolbar-side-icon @click="toggleNavigation()"></v-toolbar-side-icon>
      <v-toolbar-title>Katip</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-toolbar-items>
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
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'user-layout',
    data () {
      return {
        drawer: false,
        mini: false,
        logoutDialog: false,
        filterKey: ''
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
            this.$router.push({ name: 'record-list-page' })
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
        this.gotoPage({ name: 'login-page' })
      },
      gotoPage (routeObj) {
        this.$router.push(routeObj)
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