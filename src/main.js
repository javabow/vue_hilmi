import { createApp } from 'vue'
import App from './App.vue'
// import Header from './components/Header.vue'
import router from './router'
// import './index.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// createApp(Header).mount('#header')
// createApp.component('headerAll', Header)

createApp(App).use(router).use(VueSweetalert2).mount('#app')
