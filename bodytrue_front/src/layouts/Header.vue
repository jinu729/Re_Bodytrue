<template>
    <header>
        <div class="wrap">
            <div class="nav_left">
                <h1>
                    <router-link class="logo" to="/"><img src="../image/banner.png" alt="logo"></router-link>
                </h1>
                <div class="navbar">
                    <ul class="menu_list" v-if="user.user_auth === '1' || user.user_auth === ''" >
                        <li class="list" @click="goToList(1)">다이어트</li>
                        <li class="list" @click="goToList(2)">체형교정</li>
                        <li class="list" @click="goToList(3)">대회</li>
                        <li class="list" @click="goToList(4)">체력증진</li>
                        <li class="list" @click="goToList(5)">홈트</li>
                    </ul>
                    <ul v-else-if="user.user_auth === '0' || user.user_auth === '2'" ></ul>
                </div>
            </div>
            <div class="nav_right">
                <ul :class="['icon_list', { 'logged-in': user.email, 'logged-out': !user.email }]">
                    <li v-if="!user.user_email" class="item"  @click="gotoLogin">
                        <router-link class="icon" to="/login"><img src="../image/icon.png" alt="login">로그인</router-link>
                    </li>
                    <li v-else class="item">
                        <router-link class="icon" to="/" @click="logout"><img src="../image/icon.png" alt="login">로그아웃</router-link>
                    </li>
                    <li class="line">|</li>
                    <li v-if="!user.user_email" class="item">
                        <router-link class="icon" to="/join"><img src="../image/icon.png" alt="join">회원가입</router-link>
                    </li>
                    <li v-else class="item">
                        <router-link class="icon" :to="`/user/mypage/${user.user_no}`"><img src="../image/icon.png" alt="mypage">마이페이지</router-link>
                    </li>
                    <li class="line">|</li>
                    <li class="item">
                        <router-link class="icon" to="/faq"><img src="../image/icon.png" alt="faq">FAQ</router-link>
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
        // userAuth() {
        //     return this.user.user_auth || '';  // 기본 값 설정
        // }
    },
    created() {
        console.log("this.user.user_auth",this.user.user_auth);
    },  
    // data() {
    //     return {
    //         user_auth: ''
    //     };
    // },
    methods: {
        async goToList(menu_list) {
            try {
                window.location.href = `http://localhost:8081/prolist/${menu_list}`;

            } catch (error) {
                console.error('전송 실패:', error);
         }
        },
        ...mapMutations(['setUser', 'setTrainer','setAdmin']),
        logout() {
            this.setUser({ user_email: '', user_no: '' });
            this.setTrainer({ tr_email: '', tr_no: '' });
            localStorage.clear(); // 로컬 스토리지 비우기
            console.log(this.$store.state.user); // 상태 변화 확인
            this.$router.push('/login'); // 로그인 페이지로 리다이렉트
            localStorage.removeItem('userID'); // 로컬 스토리지에서 사용자 ID 제거
            this.$store.commit('clearUser'); // Vuex 상태에서 사용자 정보 초기화
            window.location.href = "/"; // 로그아웃 후 홈 페이지로 이동 (선택사항)

        }
    }
}
</script>
<style>
header{
    width: 100%;
    height: 80px;
    /* background-color: gray; */
    position: relative;
    border-bottom: 1.5px solid black;
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
    height: 50px;
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
    line-height: 40px;
    font-size: 22px;
    font-weight: bold;
    cursor: pointer;
}
.menu_list .list:hover{
    font-size: 26px;
    font-weight: bold;
}
header .nav_right{
    display: flex;
    align-items: end;
    justify-content: flex-start;
    z-index: 7;
}
.nav_right .logged-in {
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
    line-height: 35px;
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
.icon_list .line{
    line-height: 41px;
}
.item .icon img{
    width: 18px;
    height: 18px;
    /* padding-top: 1px; */
}
</style>