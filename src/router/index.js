import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../pages/home-page.vue'
import boardRoutes from './routes/board.routes'
import userRoutes from './routes/user.routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: dashboardPage
    // },
    ...boardRoutes,
    ...userRoutes,
  ]
})

export default router
