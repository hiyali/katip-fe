<template>
  <div>
    <v-layout align-center justify-center class="py-2">
      <v-progress-circular v-if="!records.list" :width="3" indeterminate color="green"></v-progress-circular>
      <div v-if="records.list && records.list.length === 0">No data</div>
    </v-layout>
    
    <v-list two-line v-if="records.list && records.list.length > 0">
      <v-list-tile v-for="item in records.list" :key="item.title" avatar @click="">
        <v-list-tile-avatar v-if="item.icon_ur">
          <img class="icon" :src="item.icon_url">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ getContent(item) }}</v-list-tile-sub-title>
        </v-list-tile-content>
  
        <v-list-tile-action v-if="item.type === 'PASSWORD'" @click="toggleVisible(item)">
          <v-btn icon ripple>
            <v-icon color="lighten-1">{{ visibleId == item.id ? 'visibility' : 'visibility_off' }}</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action @click="copy(item)">
          <v-btn icon ripple>
            <v-icon color="lighten-1">filter_none</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  
    <v-snackbar :timeout="3000" color="info" :vertical="true" v-model="snackbar">
      Copied!
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'record-page',
    data () {
      return {
        snackbar: false,
        visibleId: null
      }
    },
    computed: {
      ...mapGetters('Record', [
        'records'
      ])
    },
    methods: {
      getContent (item) {
        if (item.type === 'PASSWORD' && this.visibleId !== item.id) {
          return '*'.repeat(item.content ? item.content.length : 1)
        }
        return item.content
      },
      toggleVisible (item) {
        if (this.visibleId === item.id) {
          this.visibleId = null
        } else {
          this.visibleId = item.id
        }
      },
      copy (item) {
        if (require('os').platform() === 'browser') {
          window.clipboardData.setData('Text', item.content)
        } else {
          const clipboard = this.$electron.clipboard
          clipboard.writeText(item.content)
        }
        this.snackbar = true
      }
    }
  }
</script>

<style>

</style>