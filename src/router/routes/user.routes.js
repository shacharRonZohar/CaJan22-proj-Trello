import userProfile from '../../pages/user-profile.vue'
import loginLogoutSignup from '../../pages/login-logout-signup.vue'

export default [
    // Maybe login and signup are same page
    {
        path: '/login',
        name: 'login',
        component: loginLogoutSignup
    },
    {
        path: '/signup',
        name: 'signup',
        component: loginLogoutSignup
    },
    {
        path: '/user/:username',
        name: 'user-profile',
        component: userProfile
    },
]