<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // import { remote } from 'electron'
  export default {
    name: 'app',
    created () {
      this.setSubTitle('home')
    },
    methods: {
      setSubTitle (subTitle = '') {
        // subTitle = subTitle ? ' - ' + subTitle : ''
        // remote.getCurrentWindow().setTitle(remote.app.getName() + subTitle)
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
