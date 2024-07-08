// import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';

//부트스트랩
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

//승호작성


//승호작성완


//진우작성


//진우작성완


//은미작성


//은미작성완


//재영작성


//재영작성완


//회창작성


//회창작성완

const app = createApp(App)
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app');
app.use(BootstrapVue3);
window.Kakao.init("8245c279bd8e30553209dca81be94e98");