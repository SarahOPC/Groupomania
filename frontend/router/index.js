import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/login-view.vue'

const routes = [
  {
    path: '/',
    name: 'login-view',
    component: LoginView
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