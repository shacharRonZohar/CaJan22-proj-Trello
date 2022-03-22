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
      path: '/board',
      name: 'board-app',
      component: boardApp
    },
    {
      path: '/board/:boardId',
      name: 'board-details',
      component: boardDetails,
      children: [{
        path: '/task/:taskId',
        name: 'task-details',
        component: taskDetails
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: signupPage
    },
    {
      path: '/:username',
      name: 'user-profile',
      component: userProfile
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboardPage
    }
  ]
})

export default router
