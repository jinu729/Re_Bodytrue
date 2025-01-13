import { createRouter, createWebHistory } from 'vue-router'


//승호작성

import test from '../views/test'
import TrainerCreatePro from '../views/TrainerCreatePro'

//승호작성완


//진우작성
import Join from '../views/Join.vue'
import Join_main from '../views/Join_main.vue'
import Join_user from '../views/Join_user.vue'
import Join_trainer from '../views/Join_trainer.vue'
import Login from '../views/Login.vue'
import Login2 from '../views/Login2.vue'

//진우작성완


//은미작성
import ProgramDetail from '../views/ProgramDetail.vue'
import UserMyPage from '../views/UserMypage.vue'
import TrainerMyPage from '../views/TrainerMypage.vue'
import UserFaq from '../views/UserFaq.vue'
//은미작성완


//재영작성
import MainPage from '../views/MainPage.vue'
import ProgramList from '../views/ProgramList.vue'
import UserUpdate from '../views/UserUpdate.vue'
import TrainerUpdate from '../views/TrainerUpdate.vue'
//재영작성완


//회창작성
import Trainer from '../views/Trainer.vue'
import Admin from '../views/Admin.vue'
import AdminUser from '../views/userlist.vue'
import AdminTrainer from '../views/trainerlist.vue'
import AdminFaq  from '../views/AdminFaq.vue'
import AdminReview from '../views/AdminReview.vue'
import ReviewDetail from '../views/ReviewDetail.vue'
import ReviewDetail2 from '../views/ReviewDetail2.vue'
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
    path: '/adminfaq',
    name: 'AdminFaq',
    component: AdminFaq
  },
  {
    path: '/adminreview',
    name: 'AdminReview',
    component: AdminReview
  },
  {
    path: '/reviewdetail/:re_no',
    name: 'ReviewDetail',
    component: ReviewDetail
  },
  {
    path: '/reviewdetail2/:re_no',
    name: 'ReviewDetail2',
    component: ReviewDetail2
  },
  //승호작성
  
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/TrainerCreatePro/:tr_no',
    name: 'TrainerCreatePro',
    component: TrainerCreatePro
  },
//승호작성완


//진우작성
  {
    path: '/join',
    name: 'Join',
    component: Join
  },
  {
    path: '/join_main',
    name: 'Join_main',
    component: Join_main
  },
  {
    path: '/join_user',
    name: 'Join_user',
    component: Join_user
  },
  {
    path: '/join_trainer',
    name: 'Join_trainer',
    component: Join_trainer
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/login2',
    name: 'Login2',
    component: Login2
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
  },
  {
    path: '/faqlist',
    name: 'UserFaq',
    component: UserFaq
  }


//은미작성완


//재영작성
,{
  path: '/userupdate/:user_no',
  naem: 'UserUpdate',
  component: UserUpdate
},
{
  path: '/trainerupdate/:tr_no',
  naem: 'TrainerUpdate',
  component: TrainerUpdate
},

//재영작성완


//회창작성


//회창작성완

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router