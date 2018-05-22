<template>
  <v-container>
    <v-layout row>
      <v-flex xs7>
        <v-text-field v-model="title" name="title" label="Title" :rules="[rules.required]" required single-line prepend-icon="text_fields"></v-text-field>
      </v-flex>
      <v-flex xs5 class="pl-4">
        <v-text-field v-model="iconUrl" name="iconUrl" label="Icon url" :rules="[rules.webImage]" single-line prepend-icon="link"></v-text-field>
      </v-flex>
    </v-layout>
    
    <v-layout row>
      <v-flex xs7>
        <v-text-field v-if="typeObj && typeObj.type !== 'PASSWORD'" v-model="content" name="content" label="Content" multi-line rows="1" auto-grow prepend-icon="subject"></v-text-field>
        <v-text-field v-if="typeObj && typeObj.type === 'PASSWORD'" v-model="content" name="content-password" min="8" value="" :prepend-icon="typeObj.icon"
          :append-icon="visible ? 'visibility_off' : 'visibility'" :append-icon-cb="() => (visible = !visible)" :type="visible ? 'text' : 'password'">
        </v-text-field>
      </v-flex>
      <v-flex xs5 class="pl-4">
        <v-select v-model="typeObj" :items="selectTypes" label="Type" prepend-icon="filter_vintage"></v-select>
      </v-flex>
    </v-layout>
  
    <v-layout justify-center>
      <v-btn color="primary" @click="save()" :disabled="isLoading || isPristine">Save</v-btn>
      <v-btn @click="gotoPage({ name: 'record-list-page' })">Cancel</v-btn>
    </v-layout>
    
    <v-snackbar :timeout="5000" color="error" v-model="snackbar">
      Please input right informations!
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  
    <v-dialog v-model="cancelEditDialog" max-width="360px">
      <v-card class="py-2">
        <v-card-title class="headline">
          <v-layout justify-center>Are you sure to cancel?</v-layout>
        </v-card-title>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn color="primary" @click.native="leaveFunc()">Sure</v-btn>
            <v-btn color="primary" @click.native="cancelEditDialog = false" flat>Cancel</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Validation } from '@/lib'

  export default {
    name: 'record-edit-page',
    data () {
      return {
        isEditPage: false,
        isLoading: false,
        isPristine: true,
        getDataFinished: false,

        snackbar: false,
        visible: false,

        rules: {
          required: (value) => !!value || 'Required.',
          webImage: (value) => {
            return !value || Validation.webImage(value) || 'Invalid file url.'
          }
        },
        title: '',
        iconUrl: '',
        content: '',
        typeObj: null,

        cancelEditDialog: false,
        leaveFunc: () => {}
      }
    },
    computed: {
      selectTypes () {
        return this.types.map((item) => {
          return {
            ...item,
            ...{
              text: item.title
            }
          }
        })
      },
      ...mapGetters('Record', [
        'types'
      ])
    },
    watch: {
      title () {
        this.brokePristine()
      },
      iconUrl () {
        this.brokePristine()
      },
      content () {
        this.brokePristine()
      },
      typeObj (newVal, oldVal) {
        if (oldVal !== null && newVal.text !== oldVal.text) {
          this.brokePristine()
        }
      }
    },
    mounted () {
      const id = this.$route.params.id

      if (id) {
        this.isEditPage = true
        this.getRecordById(id).then(item => {
          if (!item) {
            this.$router.back()
            return
          }
  
          this.title = item.title
          this.iconUrl = item.icon_url
          this.content = item.content
          this.typeObj = this.selectTypes.find(typeObj => typeObj.type === item.type)
        }).then(() => {
          this.getDataFinished = true
        })
      } else {
        this.typeObj = this.selectTypes[0]
        this.getDataFinished = true
      }
    },
    methods: {
      brokePristine () {
        if (this.getDataFinished) {
          this.isPristine = false
        }
      },
      save () {
        const { title, iconUrl, content, typeObj } = this

        if (!title || (iconUrl && !Validation.webImage(iconUrl)) || !typeObj.type) {
          this.snackbar = true
          return
        }

        let postData = {
          title,
          icon_url: iconUrl,
          content,
          type: typeObj.type
        }

        let doFunc
        if (this.isEditPage) {
          postData.id = this.$route.params.id
          doFunc = this.updateRecord
        } else {
          doFunc = this.createRecord
        }

        this.isLoading = true
        doFunc(postData).then(res => {
          this.isPristine = true
          this.gotoPage({ name: 'record-list-page' })
        }).catch(_ => {
          this.isLoading = false
        })
      },
      gotoPage (routeObj) {
        this.$router.replace(routeObj)
      },
      ...mapActions('Record', [
        'createRecord',
        'updateRecord',
        'getRecordById'
      ])
    },
    beforeRouteLeave (to, from, next) {
      if (this.isPristine) {
        next()
      } else {
        this.cancelEditDialog = true
        this.leaveFunc = next
      }
    }
  }
</script>

<style>

</style>