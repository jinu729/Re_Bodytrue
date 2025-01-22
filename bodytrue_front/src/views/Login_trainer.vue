<template>
    <div class="wrap">
        <div class="total_login">
            <div class="sns_login">
                <h3>SNS 로그인</h3>
                <div class="sns_total">
                    <div class="kakao_login">
                        <button id="kakao_btn" class="button" type="button" @click="loginKakao" >카카오 로그인</button>
                    </div>
                    <div class="naver_login">
                        <button id="naver_btn" class="button" type="button" @click="loginNaver" >네이버 로그인</button>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <form class="common_form" @submit.prevent="login">
                <div class="common_login">
                    <h3>일반 로그인</h3>
                    <div class="common_total">
                        <div class="common_email">
                            <label for="email">이메일</label><br>
                            <input type="text" id="common_email" name="email" v-model="email" placeholder="이메일">
                        </div>
                        <div class="common_psd">
                            <label for="password">비밀번호</label><br>
                            <input type="password" id="common_psd" name="password" v-model="pwd" placeholder="비밀번호">
                        </div>
                        <div class="common_forgot">
                            <a @click="gojoin">회원가입</a>
                            <span style="color: #ccc">|</span>
                            <a @click="goEmailFind">아이디 찾기</a>
                            <span style="color: #ccc">|</span>
                            <a @click="goPwdFind">비밀번호 찾기</a>
                        </div>
                        <div class="login_btn">
                            <button type="submit" class="com_login">로그인</button>
                            <!-- <button type="button" class="com_join">회원가입</button> -->
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <FindIdModal :isOpen="isFindIdModalOpen" @close="closeFindIdModal" />
    <FindPwModal :isOpen="isFindPwModalOpen" @close="closeFindPwModal" />
</template>
<script>
import axios from 'axios';
import FindIdModal from '../views/FindId.vue';
import FindPwModal from '../views/FindPw.vue';

export default {
    components:{
            FindIdModal,
            FindPwModal,
    },
    data(){
        return{
            email: '',
            pwd : '',
            isFindIdModalOpen: false,
            isFindPwModalOpen: false,
        };
    },
    computed : {
        user() {
            return this.$store.state.user;
        },
        trainer() {
            return this.$store.state.trainer;
        }
    },
    methods: {
        async login(){
            this.user_auth = this.email.includes('@') ? 1 : 0;

            try {
                const res = await axios({
                    url : `http://localhost:3000/auth/login_user`,
                    method: "POST",
                    data: {
                        email: this.email,
                        pwd: this.pwd,
                        user_auth: this.user_auth,
                    }
                });
                if(res.data.code === 200){
                    if(this.user_auth === 1) {
                        const userPayload = {
                            user_no: res.data.user_no,
                            user_email: res.data.email,
                            user_auth: res.data.user_auth,
                        };
                        this.$store.commit('setUser', userPayload);
                        window.location.href = "/";
                    } else {
                        const user_auth = res.data.user_auth;
                        if(user_auth === 0){
                            const adminPayload = {
                                user_no : res.data.user_no,
                                user_email : res.data.user_email,
                                user_auth : res.data.user_auth,
                            };
                            this.$store.commit('setUser',adminPayload);
                            window.location.href = "/admin";
                        } else{
                            console.log("관리자가 아닙니다.");
                            this.$swal("관리자가 아닙니다.");
                            
                        }
                    }
                } else if (res.data.code === 401) {
                    // 비밀번호 오류 시
                    this.$swal(res.data.message);
                    // window.location.href = "/login";
                } else if (res.data.code === 404) {
                    // 존재하지 않는 이메일일 때
                    this.$swal(res.data.message);
                    // window.location.href = "/login";
                } else if (res.data.code === 402) {
                    // 존재하지 않는 이메일일 때
                    this.$swal(res.data.message);
                    // window.location.href = "/login";
                }
            } catch(err){
                this.$swal(err);
            }
        },
        gojoin() {
            this.$router.push("/join_main");
        },
        goEmailFind() {
            // 아이디 찾기 로직
            this.isFindIdModalOpen = true;
            console.log(this.isFindIdModalOpen);
            // console.log('아이디 찾기');
        },
        goPwdFind() {
            // 비밀번호 찾기 로직
            this.isFindPwModalOpen = true;
            console.log(this.isFindPwModalOpen);
            console.log('비밀번호 찾기');
        },
        closeFindIdModal(){
            this.isFindIdModalOpen = false;
        },
        closeFindPwModal(){
            this.isFindPwModalOpen = false;
        },
        loginKakao() {
            window.Kakao.Auth.login({
                scope: "profile_nickname, account_email",
                success: this.getKakaoProfile,
                fail: err => {
                console.error(err);
                this.$swal('카카오 로그인에 실패했습니다.');
                }
            });
        },
        getKakaoProfile(authObj) {
            console.log(authObj);  // authObj에는 access token 정보가 포함됩니다.
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: res => {
                const kakao_account = res.kakao_account;
                console.log(kakao_account);
                this.loginWithKakao(kakao_account);
                this.$swal("로그인 성공");
                },
                fail: err => {
                console.error(err);
                this.$swal('카카오 프로필을 가져오는 데 실패했습니다.');
                }
            });
        },
        async loginWithKakao(kakao_account) {
            console.log("kakao_account",kakao_account);
            try {
                console.log("Sending request to server with email:", kakao_account.email);
                // console.log("Sending request to server with user_no:", response.data.user_no);
                const response = await axios.post('http://localhost:3000/auth/kakaologin', {
                    user_email: kakao_account.email,
                    user_name: kakao_account.profile.nickname,
                    // user_no : response.data.user_no
                });
                console.log("res.data",response.data);
                this.$store.commit('setUser', {
                    user_email: response.data.email,
                    user_no: response.data.user_no,
                    user_auth: response.data.user_auth || 1 // 기본 값으로 일반 사용자 권한 설정
                    });
                    console.log("User data stored in Vuex:", this.$store.state.user);
                console.log("res.data",response.data);
                window.location.href = "/";
            } catch (error) {
                console.error(error);
                this.$swal('로그인에 실패했습니다.');
            }
        }
    },
    mounted() {
        this.naverLogin = new window.naver.LoginWithNaverId({
            clientId: "Ozm1PPMPASRIBq508on0",
            callbackUrl: "http://localhost:8081/login",
            isPopup: true
        });

        this.naverLogin.init();
        // console.log("init",this.naverLogin.init);

        this.naverLogin.getLoginStatus(async (status) => {
            console.log(this.naverLogin.getLoginStatus);
            if(status) {
                console.log(status);
                console.log(this.naverLogin.user);
                console.log("email",status.email);
                const user_email = this.naverLogin.user.getEmail();
                const user_name = this.naverLogin.user.getName();
                if(user_email == undefined || user_email == null) {
                    this.$swal("이메일은 필수 정보입니다. 정보 제공을 동의해주세요");
                    this.naverLogin.reprompt();
                    return;
                }
                try {
                    const response = await axios.post('http://localhost:3000/auth/naverlogin', {
                        user_email: user_email,
                        user_name: user_name,
                });
                    console.log("res.user_email",user_email);
                    this.$store.commit('setUser', {
                        user_email: response.data.email,
                        user_no: response.data.user_no,
                        user_auth: response.data.user_auth || 1, // 기본 값으로 일반 사용자 권한 설정
                });

                    window.location.href = '/';
                } catch (error) {
                    console.error('서버로 네이버 로그인 데이터 전송 실패:', error);
                    this.$swal('로그인에 실패했습니다.');
                }
            } else {
                console.log("callback 처리에 실패하였습니다.");
            }
        });
    },
}

</script>
<style scoped>
.wrap{
    width: 100%;
    height: 100%;
    position: relative;
    padding-top: 50px;
    padding-bottom: 80px;
    background: #e9e9e9;
}
.wrap .total_login{
    width: 60%;
    height: 650px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 50px;
    display: flex;
}
.total_login .sns_login{
    width: 49.7%;
    height: 100%;
    text-align: center;
}
.common_form{
    width: 49.7%;
    height: 100%;
    text-align: center;
}
.total_login .common_login{
    width: 100%;
}
.total_login .line{
    width: 3.5px;
    height: 80%;
    background: #ccc;
    margin-top: 65px;
    border-radius: 2px;
}
.total_login .sns_login h3, .total_login .common_login h3{
    margin: 50px;
    font-weight: bold;
    padding-bottom: 50px;
    border-bottom: 3px solid #ccc;
    border-radius: 1px;
}
.sns_login .sns_total{
    width: 80%;
    margin: 0 auto;
    border-radius: 25px;
    margin-top: 80px;
}
.sns_total .kakao_login, .sns_total .naver_login{
    width: 100%;
    padding-top: 35px;
    margin: 0 auto;
}
.sns_total .kakao_login button, .sns_total .naver_login button{
    width: 100%;
    height: 48px;
    border-radius: 15px;
    border: 0;
    font-weight: bold;
}
#kakao_btn{
    background: #FEE500;
    color: rgb(110, 110, 110);
}
#naver_btn{
    background: #03cf5d;
    color: white;
}
.common_login .common_total{
    width: 80%;
    margin: 0 auto;
    border-radius: 25px;
    margin-top: 50px;
}
.common_total .common_email, .common_total .common_psd{
    width: 100%;
    padding-bottom: 10px;
    text-align: left;
}
.common_email label, .common_psd label{
    font-size: 14px;
    padding-left: 10px;
    font-weight: 600;
    padding-bottom: 5px;
}
.common_email input, .common_psd input{
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 2px solid #e9e9e9;
    padding-left: 15px;
}
.common_forgot{    
    margin-bottom: 20px;
    color: #ccc;
}
.common_forgot a{
    padding: 8px;
    color: #ccc;
    cursor: pointer;
}
.login_btn{
    width: 100%;
}
.login_btn .com_login, .login_btn .com_join{
    width: 100%;
    height: 48px;
    border-radius: 15px;
    border: 0;
    font-weight: bold;
    margin-bottom: 15px;
    /* background: rgba(0, 199, 174, 0.5); */
    background: rgba(190, 190, 190, 0.8);
    /* background: rgba(2, 230, 199, 0.8); */
    /* background: #02e6c7;
    background: #00C7AE; */
    color: white;
}
</style>