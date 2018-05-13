import Vue from 'vue'
import Router from 'vue-router'

import { RootLayout, SplashPage } from '@/pages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/k',
      component: RootLayout,
      children: [
        {
          path: 'splash',
          name: 'splash-page',
          component: SplashPage
        },
        {
          path: 'login',
          name: 'login-page',
          component: require('@/pages/Login').default
        },
        {
          path: 'register',
          name: 'register-page',
          component: require('@/pages/Register').default
        },
        {
          path: 'user',
          component: require('@/pages/UserLayout').default,
          children: [
            {
              path: 'record',
              name: 'record-page',
              component: require('@/pages/Record').default
            }
          ]
        },
        {
          path: 'about',
          name: 'about-page',
          component: require('@/pages/About').default
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'splash-page' }
    }
  ]
})
