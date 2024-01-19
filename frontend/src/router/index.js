import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import(/* webpackChunkName: "about" */ '../views/Rooms.vue')
  },
  {
    path: '/tutoring',
    name: 'Tutoring',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tutoring.vue')
  },
  {
    path: '/tutoring/setup',
    name: 'TutorSessionSetup',
    component: () => import(/* webpackChunkName: "about" */ '../views/TutorSessionSetup.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/mytutoring',
    name: 'MyTutoring',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyTutoring.vue')
  },
  {
    path: '/search-log',
    name: 'SearchLogs',
    component: () => import(/* webpackChunkName: "about" */ '../views/SearchLog.vue')
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
