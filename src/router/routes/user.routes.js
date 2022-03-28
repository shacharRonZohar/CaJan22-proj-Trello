import userProfile from '../../pages/user-profile.vue'
import loginSignup from '../../pages/login-signup.vue'

export default [
    // Maybe login and signup are same page
    {
        path: '/auth/:action',
        name: 'login',
        component: loginSignup
    },
    {
        path: '/user/:username',
        name: 'user-profile',
        component: userProfile
    },
]