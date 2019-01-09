import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "",
      component: require('@/app').default,
      meta: {
        auth: true,
      },
      children: [
        //////////////////////////////////
        /// CONFIG
        //////////////////////////////////
        {
          name: 'dashboard',
          path: '',
          component: require('@/components/dashboard').default,
          meta: {
            meta: {
              auth: true,
            },
          }
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: require('@/components/login').default,
      meta: {
        auth: false,
      },
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})
