<template>
  <v-app :dark="themeDark">
    <v-navigation-drawer app :mini-variant.sync="mini" v-model="drawer">
      <v-list subheader dense>
        <img v-show="!mini" class="logo" src="~@/assets/images/logo.png" alt="electron-vue">
      
        <v-divider></v-divider>
        <v-list-tile v-if="userInfo" @click="gotoPage({ name: 'record-list-page' })">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Record list</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      
        <v-divider></v-divider>
        <v-list-tile @click="setThemeDark(!themeDark)">
          <v-list-tile-action>
            <v-icon>{{ themeDark ? 'brightness_5' : 'brightness_3' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ themeDark ? 'Theme light' : 'Theme dark' }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="mini = !mini">
          <v-list-tile-action>
            <v-icon>{{ mini ? 'more_horiz' : 'more_vert' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Mini mode</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  
    <v-toolbar app>
      <v-toolbar-side-icon @click="toggleNavigation()"></v-toolbar-side-icon>
      <v-toolbar-title>Katip</v-toolbar-title>
      <v-spacer></v-spacer>
    
      <v-menu offset-y v-if="userInfo">
        <v-list-tile slot="activator">
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
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  
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
  
    <v-snackbar :timeout="5000" color="error" :multi-line="false" v-model="errorSnackbar">
      {{ errorText }}
      <v-btn dark flat @click.native="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
  
    <v-footer app height="auto">
      <v-card flat tile class="text-xs-center" width="100%" v-show="false">
        <v-card-text>
          The KATIP is a tool which will provide a securable text storage service support for individuals
        </v-card-text>
        
        <v-card-text>
          <v-btn icon class="mx-3" title="About" @click="gotoPage({ name: 'about-page' })">
            <v-icon size="24px">contacts</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
      
      <v-layout justify-center>
        2018 &copy; <strong>hiyali.org</strong>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'root-layout',
    data () {
      return {
        drawer: false,
        mini: false,

        logoutDialog: false,
        errorSnackbar: false,
        errorText: ''
      }
    },
    computed: {
      ...mapGetters('App', [
        'themeDark',
        'errorMessage'
      ]),
      ...mapGetters('User', [
        'userInfo',
        'isLogin'
      ])
    },
    watch: {
      errorMessage (newVal) {
        this.errorText = newVal.msg
        this.errorSnackbar = true
      }
    },
    mounted () {
      /*
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
       } // */
    },
    methods: {
      toggleNavigation () {
        this.drawer = !this.drawer
      },
      doLogout () {
        this.logout().then(() => {
          this.logoutDialog = false
          this.gotoLogin()
        })
      },
      gotoLogin () {
        this.gotoPage({ name: 'login-page' })
      },
      gotoPage (routeObj) {
        this.$router.push(routeObj)
      },
      ...mapActions('App', [
        'setThemeDark'
      ]),
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