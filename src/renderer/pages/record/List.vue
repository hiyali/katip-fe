<template>
  <v-container>
    <v-layout row class="pb-2">
      <v-flex sm6 class="hidden-xs-only">
        <v-text-field v-model="filterKey" prepend-icon="filter_list" type="text" name="filter-input" min="2" placeholder="Filter by title" :solo="true" flat></v-text-field>
      </v-flex>
      
      <v-flex md3 offset-xs1 class="hidden-sm-and-down">
        <v-select v-model="typeObj" :items="selectTypes" label="Filter by type"></v-select>
      </v-flex>
      
      <v-flex xs12 sm6 class="text-xs-right">
        <v-btn color="primary" class="white--text" @click.native="gotoPage({ name: 'record-add-page' })">
          New Record
          <v-icon right dark>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    
    <v-layout align-center justify-center>
      <v-progress-circular v-if="!record.list" :width="3" indeterminate color="green"></v-progress-circular>
      <div v-if="record.list && record.list.length === 0">No data</div>
    </v-layout>
    
    <v-list two-line v-if="record.list && record.list.length > 0">
      <v-list-tile v-for="item in record.list" :key="item.id" avatar @click="gotoPage({ name: 'record-edit-page', params: { id: item.id } })">
        <v-list-tile-avatar v-if="isWebImage(item.icon_url)">
          <img class="icon" :src="item.icon_url">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ getContent(item) }}</v-list-tile-sub-title>
        </v-list-tile-content>
  
        <v-list-tile-action v-if="item.type === 'PASSWORD'" @click="toggleVisible(item, $event)">
          <v-btn icon ripple>
            <v-icon color="lighten-1">{{ visibleId == item.id ? 'visibility_off' : 'visibility' }}</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-action @click="copy(item, $event)">
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
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Validation, Debounce } from '@/lib'
  
  export default {
    name: 'record-list-page',
    data () {
      return {
        snackbar: false,
        visibleId: null,
        debounceSearch: () => {},
        typeObj: null,
        filterKey: ''
      }
    },
    computed: {
      selectTypes () {
        const vuetifyTypes = this.types.map((item) => {
          return {
            ...item,
            ...{
              text: item.title
            }
          }
        })
        vuetifyTypes.unshift({
          text: 'All',
          type: '',
          icon: 'remove'
        })
        return vuetifyTypes
      },
      ...mapGetters('Record', [
        'record',
        'types'
      ])
    },
    watch: {
      typeObj (newVal) {
        if (newVal) {
          this.filterByType(newVal.type)
        }
      },
      filterKey (newVal) {
        this.debounceSearch(newVal)
      }
    },
    created () {
      if (!this.record.list) {
        this.getRecordList()
      }
    },
    mounted () {
      this.typeObj = this.selectTypes[0]

      this.debounceSearch = Debounce(this.filterByTitle, 500)
    },
    methods: {
      getContent (item) {
        if (item.type === 'PASSWORD' && this.visibleId !== item.id) {
          return '*'.repeat(8)
        }
        return item.content
      },
      isWebImage (url) {
        return Validation.webImage(url)
      },
      toggleVisible (item, event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }

        if (this.visibleId === item.id) {
          this.visibleId = null
        } else {
          this.visibleId = item.id
        }
      },
      copy (item) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }

        if (require('os').platform() === 'browser') {
          window.clipboardData.setData('Text', item.content)
        } else {
          const clipboard = this.$electron.clipboard
          clipboard.writeText(item.content)
        }
        this.snackbar = true
      },
      gotoPage (routeObj) {
        this.$router.replace(routeObj)
      },
      ...mapActions('Record', [
        'getRecordList',
        'filterByType',
        'filterByTitle'
      ])
    }
  }
</script>

<style>

</style>