import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../pages/home-page.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/about',
      name: 'about',
    }
  ]
})

export default router
