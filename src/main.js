import './assets/main.css'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


const app = createApp(App)
app.use(router)
app.mount('#app')
