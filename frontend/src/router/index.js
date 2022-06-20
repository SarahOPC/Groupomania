import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SingupView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignupView.vue')
  },
  /* {
    path: '/profil',
    name: 'ProfilView',
    component: () => import(/* webpackChunkName: "profil" */ //'../views/ProfilView.vue')
  //},
  //{
  //  path: '/news',
  //  name: 'mainNewsFeedView',
  //  component: () => import(/* webpackChunkName: "news" */ '../views/MainNewsFeedView.vue')
  //},
  //{
  //  path: '/logout',
  //  name: 'Logout',
  //  component: () => import(/* webpackChunkName: "logout" */ '../views/LogoutView.vue')
  //} */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
