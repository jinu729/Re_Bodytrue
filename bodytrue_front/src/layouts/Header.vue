<template>
    <header>
        <div class="wrap">
            <div class="nav_left">
                <h1>
                    <router-link v-if="isLoggedIn_admin" class="logo" to="/admin"><img src="../image/banner.png" alt="logo"></router-link>
                    <router-link v-else-if="isLoggedIn_tr" class="logo" to="/trainer"><img src="../image/banner.png" alt="logo"></router-link>
                    <router-link v-else-if="isLoggedIn" class="logo" to="/"><img src="../image/banner.png" alt="logo"></router-link>
                    <router-link v-else class="logo" to="/"><img src="../image/banner.png" alt="logo"></router-link>
                </h1>

                <div class="navbar">
                    <ul class="menu_list" v-if="isUser" >
                        <li class="list" @click="goToList(0)">다이어트</li>
                        <li class="list" @click="goToList(1)">체형교정</li>
                        <li class="list" @click="goToList(2)">대회</li>
                        <li class="list" @click="goToList(3)">체력증진</li>
                        <li class="list" @click="goToList(4)">홈트</li>
                    </ul>
                    <ul v-else-if="isTrainer" ></ul>
                    <ul v-else-if="isAdmin" ></ul>
                    <ul class="menu_list" v-else-if="isNon" >
                        <li class="list" @click="goToList(0)">다이어트</li>
                        <li class="list" @click="goToList(1)">체형교정</li>
                        <li class="list" @click="goToList(2)">대회</li>
                        <li class="list" @click="goToList(3)">체력증진</li>
                        <li class="list" @click="goToList(4)">홈트</li>
                    </ul>
                </div>
            </div>
            <div class="nav_right">
                 <!-- 일반 사용자 로그인 상태 -->
                <ul v-if="isLoggedIn" class="icon_list">
                    <li class="item">
                        <router-link class="icon" to="/" @click="gotologout"><img src="../image/logouticon.png" alt="logout">로그아웃</router-link>
                    </li>
                    <li class="line">|</li>

                    <li v-if="!user.user_email" class="item">
                        <router-link class="icon" to="/join"><img src="../image/joinicon.png" alt="join">회원가입</router-link>
                    </li>
                    <li v-else class="item">
                        <router-link class="icon" :to="`/mypage/${user.user_no}`"><img src="../image/mypageicon.png" alt="mypage">마이페이지</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" to="/faqlist"><img src="../image/faq2icon.png" alt="faq">FAQ</router-link>
                    </li>
                </ul>

                <!-- 트레이너 로그인 상태 -->
                <ul v-if="isLoggedIn_tr" class="icon_list">
                    <li class="item">
                        <router-link class="icon" to="/" @click="gotologout"><img src="../image/logouticon.png" alt="logout">로그아웃</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" :to="`/trmypage/${trainer.tr_no}`"><img src="../image/mypageicon.png" alt="mypage">마이페이지</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" :to="`/TrainerCreatePro/${trainer.tr_no}`"><img src="../image/create.png" alt="tr_create">프로그램 등록</router-link>
                    </li>
                </ul>

                <!-- 관리자 로그인 상태 -->
                <ul v-if="isLoggedIn_admin" class="icon_list">
                    <li class="item">
                        <router-link class="icon" to="/" @click="gotologout"><img src="../image/logouticon.png" alt="logout">로그아웃</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" to="/admin/userlist"><img src="../image/usericon.png" alt="adminuser">회원관리</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" to="/admin/trainerlist"><img src="../image/trainericon.png" alt="admintrainer">트레이너관리</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" to="/adminfaq"><img src="../image/faq2icon.png" alt="adminfaq">FAQ관리</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" to="/adminreview"><img src="../image/review.png" alt="adminreview">리뷰관리</router-link>
                    </li>
                </ul>

                <!-- 로그인되지 않은 상태 -->
                <ul v-if="!isLoggedIn && !isLoggedIn_tr && !isLoggedIn_admin" class="icon_list">
                    <li class="item" @click="gotoLogin">
                        <router-link class="icon" to="/login"><img src="../image/loginicon.png" alt="login">로그인</router-link>
                    </li>
                    <li class="item" @click="gotoLogin">
                        <router-link class="icon" to="/login_main"><img src="../image/loginicon.png" alt="login">로그인2</router-link>
                    </li>
                    <li class="line">|</li>
                    <!-- <li class="item">
                        <router-link class="icon" to="/join"><img src="../image/joinicon.png" alt="join">회원가입</router-link>
                    </li> -->
                    <li class="item">
                        <router-link class="icon" to="/join_main"><img src="../image/joinicon.png" alt="join">회원가입</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" to="/faqlist"><img src="../image/faq2icon.png" alt="faq">FAQ</router-link>
                    </li>
                </ul>        
            </div>
        </div>
    </header>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
    name : 'header',
    computed: {
        user() {
            return this.$store.state.user;       
        },
        trainer(){
            return this.$store.state.trainer;
        },
        isLoggedIn() {
            return !!this.user.user_email && this.user.user_auth === 1;
        },
        isLoggedIn_tr() {
            return !!this.trainer.tr_email;
        },
        isLoggedIn_admin() {
            return this.user.user_auth === 0;
        },
        isUser() {
            return this.user.user_auth === 1 ;
        },
        isTrainer() {
            return this.trainer.tr_admit === 1;
        },
        isAdmin() {
            return this.user.user_auth === 0 ;
        },
        isNon(){
            return this.user.user_auth === '';
        }
    },
    mounted() {
        console.log("this.user.user_auth",this.user.user_auth);
        console.log("this.trainer.tr_admit",this.trainer.tr_admit);
        console.log("isTrainer",this.isTrainer)
    },  
    // data() {
    //     return {
    //         user_auth: ''
    //     };
    // },
    methods: {
        async goToList(pro_tag) {
            try {
                window.location.href = `http://localhost:8081/prolist/${pro_tag}`;
                // this.$router.push({ path : `/prolist/${pro_tag}`})

            } catch (error) {
                console.error('전송 실패:', error);
         }
        },
        ...mapMutations(['setUser', 'setTrainer']),
        gotologout() {
            this.setUser({ user_email: '', user_no: '', user_auth: '' });
            this.setTrainer({ tr_email: '', tr_no: '', tr_admit: '' });
            localStorage.clear(); // 로컬 스토리지 비우기
            console.log(this.$store.state.user); // 상태 변화 확인
            console.log(this.$store.state.trainer); // 상태 변화 확인
            this.$router.push('/login'); // 로그인 페이지로 리다이렉트
            // localStorage.removeItem('userID'); // 로컬 스토리지에서 사용자 ID 제거
            // this.$store.commit('clearUser'); // Vuex 상태에서 사용자 정보 초기화
            window.location.href = "/"; // 로그아웃 후 홈 페이지로 이동 (선택사항)

        }
    }
}
</script>
<style scoped>
header{
    width: 100%;
    height: 80px;
    /* background-color: gray; */
    position: relative;
    border-bottom: 1.5px solid rgba(0, 0, 0, 0.2);
}
header .wrap{
    width: 80%;
    height: 80px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
header .nav_left{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 7;
}
header .nav_left h1{
    width: 180px;
    height: 55px;
}
header .logo img{
    height: 45px;
    /* line-height: 60px; */
}
.nav_left .navbar{
    display: block;
    padding-left: 40px;
}
.nav_left .navbar .menu_list{
    width: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.menu_list .list{
    height: 40px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}
.menu_list .list:hover{
    font-size: 20px;
    font-weight: bold;
}
header .nav_right{
    display: flex;
    align-items: end;
    justify-content: flex-start;
    z-index: 7;
}
.nav_right .logged-in, .icon_list {
    /* width: 250px; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.nav_right .logged-out {
    /* width: 300px; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.icon_list .item{
    /* line-height: 35px; */
    font-size: 14px;
    font-weight: bold;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
.icon_list .line{
    line-height: 30px;
}
.item .icon img{
    width: 16px;
    height: 16px;
    /* padding-top: 1px; */
}
</style>