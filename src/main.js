import { createApp } from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'
import { focusDirective, closeOnBlur } from './directives'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css';
import './styles/styles.scss'



createApp(app)
    .use(store)
    .use(router)
    .directive('focus', focusDirective)
    .directive('close', closeOnBlur)
    .component('Datepicker', Datepicker)
    .mount('#app')
