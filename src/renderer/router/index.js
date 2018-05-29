import Vue from 'vue'
import Router from 'vue-router'

import Store from '@/store'
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
          component: require('@/pages/common/Login').default
        },
        {
          path: 'register',
          name: 'register-page',
          component: require('@/pages/common/Register').default
        },
        {
          path: 'forget-password',
          name: 'forget-password-page',
          component: require('@/pages/common/ForgetPassword').default
        },
        {
          path: 'reset-password',
          name: 'reset-password-page',
          component: require('@/pages/common/ResetPassword').default
        },
        {
          path: 'user',
          component: require('@/pages/layout/User').default,
          beforeEnter: (to, from, next) => {
            if (Store.getters['User/isLogin']) {
              next()
            } else {
              next(from)
            }
          },
          children: [
            {
              path: 'record-list',
              name: 'record-list-page',
              component: require('@/pages/record/List').default
            },
            {
              path: 'record-add',
              name: 'record-add-page',
              component: require('@/pages/record/Edit').default
            },
            {
              path: 'record-edit/:id',
              name: 'record-edit-page',
              component: require('@/pages/record/Edit').default
            },
            {
              path: 'change-password',
              name: 'change-password-page',
              component: require('@/pages/user/ChangePassword').default
            },
            {
              path: 'edit-info',
              name: 'edit-info-page',
              component: require('@/pages/user/EditInfo').default
            }
          ]
        },
        {
          path: 'about',
          name: 'about-page',
          component: require('@/pages/other/About').default
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'splash-page' }
    }
  ]
})
