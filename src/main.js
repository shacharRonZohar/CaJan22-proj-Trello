import { createApp } from 'vue'
<<<<<<< HEAD


import App from './App.vue'
=======
import app from './app.vue'
>>>>>>> 0b9cbd24dcc47d68602e65e6834e07a21ff33466
import router from './router'
import store from './store'
import './styles/styles.scss'

createApp(app)
    .use(store)
    .use(router)
    .mount('#app')