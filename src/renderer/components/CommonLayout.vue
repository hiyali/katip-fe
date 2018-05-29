<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title><slot name="title"></slot></v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <slot></slot>
            
            <v-layout justify-end>
              <slot name="support-link"></slot>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout justify-center>
              <slot name="buttons"></slot>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'common-layout'
  }
</script>

<style>

</style>