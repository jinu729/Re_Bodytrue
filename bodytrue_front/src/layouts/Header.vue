<template>
    <header>
        <div class="wrap">
            <div class="nav_left">
                <h1>
                    <router-link class="logo" to="/"><img src="../image/BODYTRUE.png" alt="logo"></router-link>
                </h1>
                <div class="navbar">
                    <ul class="menu_list">
                        <li class="list" @click="goToList(1)">다이어트</li>
                        <li class="list" @click="goToList(2)">체형교정</li>
                        <li class="list" @click="goToList(3)">대회</li>
                        <li class="list" @click="goToList(4)">체력증진</li>
                        <li class="list" @click="goToList(5)">홈트</li>
                    </ul>
                </div>
            </div>
            <div class="nav_right">
                <ul class="icon_list">
                    <li v-if="user.email==undefined" class="item"  @click="gotoLogin">
                        <router-link class="icon" to="/login"><img src="../image/icon.png" alt="login">로그인</router-link>
                    </li>
                    <li v-else class="item">
                        <router-link class="icon" to="/"><img src="../image/icon.png" alt="login">로그아웃</router-link>
                    </li>
                    <li class="line">|</li>
                    <li v-if="user.email==undefined" class="item">
                        <router-link class="icon" to="/join"><img src="../image/icon.png" alt="join">회원가입</router-link>
                    </li>
                    <li v-else class="item">
                        <router-link class="icon" to="/mypage"><img src="../image/icon.png" alt="mypage">마이페이지</router-link>
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
export default {
    name : 'header',
    computed: {
    user() {
      return this.$store.state.user;
        }
    },
    data() {
        return {
            sampleData: ''
        };
    },
    methods: {
        async goToList(menu_list) {
            try {
                window.location.href = `http://localhost:8081/prolist/${menu_list}`;

            } catch (error) {
                console.error('전송 실패:', error);
         }
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
    height: 60px;
    line-height: 60px;
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
.nav_right .icon_list{
    width: 250px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.icon_list .item{
    line-height: 35px;
    font-size: 18px;
    font-weight: bold;
}
.icon_list .line{
    line-height: 30px;
}
.item .icon img{
    width: 18px;
    height: 18px;
    /* padding-top: 1px; */
}
</style>