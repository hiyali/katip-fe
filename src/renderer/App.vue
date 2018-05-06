<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted () {
      this.setSubTitle('home')
    },
    methods: {
      setSubTitle (subTitle = '') {
        subTitle = subTitle ? ' - ' + subTitle : ''
        if (require('os').platform() === 'browser') {
          window.document.title = 'Katip' + subTitle
        } else {
          const remote = this.$electron.remote
          remote.getCurrentWindow().setTitle(remote.app.getName() + subTitle)
        }
      }
    }
  }
</script>

<style>
  html {
    overflow: auto;
  }
</style>
