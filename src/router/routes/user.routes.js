import loginPage from '../../pages/login-page.vue'
import signupPage from '../../pages/signup-page.vue'
import userProfile from '../../pages/user-profile.vue'

export default [
    // Maybe login and signup are same page
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
        path: '/user/:username',
        name: 'user-profile',
        component: userProfile
    },
]