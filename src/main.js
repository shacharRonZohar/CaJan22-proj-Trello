import { createApp } from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import { focusDirective, closeOnBlur } from './directives'
<<<<<<< HEAD
import gAuthPlugin from 'vue3-google-oauth2'
=======
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css';
>>>>>>> ce313caa20106e9b7d27344ee8ee319f88fda4d7
import './styles/styles.scss'

const gAuthCLientID = '1085095174420-s26dkcaicaiubfjpebgqjpb3dopricv9.apps.googleusercontent.com'


createApp(app)
    .use(store)
    .use(router)
    .use(gAuthPlugin, {
        clientId: gAuthCLientID,
        scope: 'email',
        prompt: 'consent'
    })
    .directive('focus', focusDirective)
    .directive('close', closeOnBlur)
    .component('Datepicker', Datepicker)
    .mount('#app')
