import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/login-view.vue'

const routes = [
  {
    path: '/',
    name: 'login-view',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'singup-view',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/signup-view.vue')
  },
  {
    path: '/profil',
    name: 'profil-view',
    component: () => import(/* webpackChunkName: "profil" */ '../views/profil-view.vue')
  },
  {
    path: '/news',
    name: 'main-news-feed-view',
    component: () => import(/* webpackChunkName: "news" */ '../views/main-news-feed-view.vue')
  },
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
