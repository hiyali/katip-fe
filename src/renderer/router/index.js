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
          path: 'user',
          component: require('@/pages/UserLayout').default,
          children: [
            {
              path: 'records',
              name: 'records-page',
              component: require('@/pages/Records').default
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
