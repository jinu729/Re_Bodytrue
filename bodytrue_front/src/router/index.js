import { createRouter, createWebHistory } from 'vue-router'


//승호작성

import test from '../views/test'
import TrainerCreatePro from '../views/TrainerCreatePro'

//승호작성완


//진우작성
import Join from '../views/Join.vue'
import Login from '../views/Login.vue'

//진우작성완


//은미작성
import ProgramDetail from '../views/ProgramDetail.vue'
import UserMyPage from '../views/UserMypage.vue'
import TrainerMyPage from '../views/TrainerMypage.vue'
//은미작성완


//재영작성
import MainPage from '../views/MainPage.vue'
import ProgramList from '../views/ProgramList.vue'

//재영작성완


//회창작성
import Trainer from '../views/Trainer.vue'
import Admin from '../views/Admin.vue'
import AdminUser from '../views/userlist.vue'
import AdminTrainer from '../views/trainerlist.vue'
import AdminFaq from '../views/AdminFaq.vue'
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
    path: '/admin/userlist',
    name: 'AdminUser',
    component: AdminUser
  },
  {
    path: '/admin/trainerlist',
    name: 'AdminTrainer',
    component: AdminTrainer
  },
  {
    path: '/admin/adminfaq',
    name: 'AdminFaq',
    component: AdminFaq
  }
  //승호작성
  ,
  {
    path: '/test',
    name: 'test',
    component: test
  }
  ,
  {
    path: '/TrainerCreatePro/:tr_no',
    name: 'TrainerCreatePro',
    component: TrainerCreatePro
  }
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
    path: '/prolist/:pro_tag',
    name: 'ProgramList',
    component: ProgramList
  }

//진우작성완


//은미작성
,
  {
    path: '/prodetail/:pro_no', 
    name: 'ProgramDetail',
    component: ProgramDetail
  },
  {
    path: '/mypage/:user_no',
    name: 'UserMyPage',
    component: UserMyPage
  },
  {
    path: '/trmypage/:tr_no',
    name: 'TrainerMyPage',
    component: TrainerMyPage
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