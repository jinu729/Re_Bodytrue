import { createRouter, createWebHistory } from 'vue-router'


//승호작성


//승호작성완


//진우작성
import Join from '../views/Join.vue'
import Login from '../views/Login.vue'
import ProgramList from '../views/ProgramList.vue'

//진우작성완


//은미작성
import ProgramDetail from '../views/ProgramDetail.vue'

//은미작성완


//재영작성
import MainPage from '../views/MainPage.vue'

//재영작성완


//회창작성
import Trainer from '../views/Trainer.vue'
import Admin from '../views/Admin.vue'
import AdminUser from '../views/AdminUser.vue'
//회창작성완

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/trainer',
    name: 'Trainer',
    component: Trainer
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/adminuser',
    name: 'AdminUser',
    component: AdminUser
  }
  //승호작성


//승호작성완


//진우작성
,
  {
    path: '/join',
    name: 'Join',
    component: Join
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/prolist/:menu_list',
    name: 'ProgramList',
    component: ProgramList
  }

//진우작성완


//은미작성
,
  {
    path: '/user/prodetail/:pro_no', 
    name: 'ProgramDetail',
    component: ProgramDetail
  }

//은미작성완


//재영작성

//재영작성완


//회창작성


//회창작성완

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router