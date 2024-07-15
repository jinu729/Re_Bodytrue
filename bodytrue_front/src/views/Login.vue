<template>
    <body>
        <h1 style="text-align: center; padding-top: 20px">로그인</h1>
        <div class="line-center"></div>
        <div class="login-container">
                <div class="form_right">
                    <label for="user">
                        <input type="radio" id="user" name="auth" v-model="user_auth" value="1" >회원 &nbsp;&nbsp;
                    </label>
                    <label for="admin" hidden>
                        <input type="radio" id="admin" name="auth" v-model="user_auth" value="0" hidden>관리자 &nbsp;&nbsp;
                    </label>
                    <label for="trainer">
                        <input type="radio" id="trainer" name="auth" v-model="user_auth" value="2"> 트레이너
                    </label>
                </div>                        
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="email">이메일 주소</label>
                    <div class="input-with-icon">
                        <input type="text" id="email" name="email" v-model="email" placeholder="이메일 주소">
                    </div>
                </div>  
                <div class="form-group">
                    <label for="password">비밀번호</label>
                    <div class="input-with-icon">
                        <input type="password" id="pwd" name="pwd" v-model="pwd" placeholder="비밀번호">
                    </div>
                </div>
                <div class="form-group forgot-password">
                    <a @click="goEmailFind">아이디 찾기</a>
                    <span style="color: #2b2a2aa5">|</span>
                    <a @click="goPwdFind">비밀번호 찾기</a>
                </div>
                <div class="form-group save-id-checkbox">
                    <span>
                        <!-- <input type="checkbox" name="rememberMe" v-model="rememberMe" > 아이디 저장 -->
                        <input type="checkbox" name="rememberMe"  > 아이디 저장
                    </span>
                </div>
                <div class="form-group">
                    <button type="submit" class="login-button">로그인</button>
                </div>
                <div class="form-group">
                    <button type="button" @click="goToJoin">회원가입</button>
                </div>
                <br>
                <br>
                
                <h1 style="text-align: center;">SNS 로그인</h1>
                <div class="line-center"></div>
                <br>
                <div class="form-group">
                    <button id="special2-button" class="button" type="button" @click="loginKakao" >카카오 로그인</button>
                </div>
                <div class="form-group">
                    <button id="special-button" class="button" type="button" @click="loginNaver" >네이버 로그인</button>
                </div>
            </form>
            <div style="text-align: center">
                <button class="close" @click="cancel">취소</button>
            </div>
        </div>
        <FindIdModal :isOpen="isFindIdModalOpen" @close="closeFindIdModal" />
        <FindPwModal :isOpen="isFindPwModalOpen" @close="closeFindPwModal" />
    </body>

</template>
<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import FindIdModal from '../views/FindId.vue';
import FindPwModal from '../views/FindPw.vue';

export default {
        components:{
            FindIdModal,
            FindPwModal,
        },
        data() {
            return {
                user_auth: '0',
                // email: '',
                pwd: '',
                // 모달
                isFindIdModalOpen: false,
                isFindPwModalOpen: false,
                // rememberMe: false,
                naverLogin: null,
            };
        },
        computed: {
            user() {
                return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
            },
            trainer() {
                return this.$store.state.trainer; // user 정보가 바뀔 때마다 자동으로 trainer() 갱신
            },
            isLoggedIn() {
                return !!this.$store.state.user.user_email || !!this.$store.state.trainer.tr_email;
            },
            email: {
                get() {
                    return this.$store.getters.userEmail;
                },  
                set(value) {
                    this.$store.dispatch('updateUserEmail', value);
                    // this.$store.dispatch('updateTrEmail', value);
                },
    }
        }, 
        created() {
            if (!this.isLoggedIn) {
                this.$router.push('/login'); // 로그인 상태가 아니면 로그인 페이지로 리다이렉트
            }
            
        },
        methods: {
            ...mapMutations({
            setUser: 'user', // user 뮤테이션을 setUser 메서드로 매핑
            setTrainer: 'trainer', // trainer 뮤테이션을 setTrainer 메서드로 매핑
            setAdmin: 'admin', // user 뮤테이션을 setUser 메서드로 매핑
            }),
            // loadUserId() {
            //     const savedUserId = localStorage.getItem('savedUserId');
            //     if (savedUserId) {
            //         this.email = savedUserId;
            //         this.rememberMe = true;
            //     }
            // },
            async login() {
                const endpoint = (this.user_auth === '0' || this.user_auth === '1') ? 'login_user' : 'login_tr';
                try {
                    console.log(endpoint);
                    const res = await axios({
                        url: `http://localhost:3000/auth/${endpoint}`,
                        method: "POST",
                        data: {
                            email: this.email,
                            pwd: this.pwd,
                            user_auth: this.user_auth,
                        },
                    });
                    console.log(res.data.data);
                    console.log(res.data);
                    console.log("res.data.email", res.data.email);
                    console.log("res.data.user_auth", res.data.user_auth);

                    if (res.data.code === 200) {
                        // 로그인 성공 시
                        if (this.user_auth === '1') {
                            const userPayload = {
                                user_email: res.data.email,
                                user_no: res.data.user_no,
                                user_auth: res.data.user_auth,
                            };
                            this.$store.commit('setUser',userPayload);
                            // this.setUser(userPayload);
                            window.location.href = "/";
                            console.log(userPayload);
                            console.log("user_email",res.data.email);
                            console.log("user_auth",res.data.user_auth);
                            //console.log({user_auth : userPayload.user_auth});
                        } else if (this.user_auth === '2') {
                            const tr_admit = res.data.tr_admit || 0;
                            if (tr_admit === 1) {
                                    const trainerPayload = {
                                        tr_email: res.data.email,
                                        tr_no: res.data.tr_no,
                                        tr_admit: res.data.tr_admit,
                                    };
                                    this.$store.commit('setTrainer', trainerPayload);
                                    window.location.href = "/trainer";
                                    console.log("trainerpayload", trainerPayload);
                                } else {
                                    // tr_admit이 1이 아닐 때 처리
                                    console.log("트레이너 승인 대기 중");
                                    this.$swal("트레이너 승인이 필요합니다.");
                                }
                        } else {
                            //     const adminPayload = {
                            //         user_email : res.data.email,
                            //         user_no : res.data.user_no,
                            //         user_auth: res.data.user_auth,
                            //     };
                            // this.$store.commit('setUser',adminPayload);
                            // window.location.href = "/admin";
                            const user_auth = res.data.user_auth;
                            if(user_auth === 0){
                                const adminPayload = {
                                    user_email : res.data.email,
                                    user_no : res.data.user_no,
                                    user_auth: res.data.user_auth,
                                };
                                this.$store.commit('setUser',adminPayload);
                                window.location.href = "/admin";
                                console.log(user_auth);
                            } else{
                                console.log("관리자가 아닙니다.");
                                this.$swal("관리자가 아닙니다.")
                            }
                        }

                        // this.$swal({
                        //     position: 'top',
                        //     icon: 'success',
                        //     title: '로그인 성공!',
                        //     showConfirmButton: false,
                        //     timer: 3000
                        // });

                        // window.location.href = "/";
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
                } catch (err) {
                    this.$swal(err);
                }
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
            goToJoin() {
                // 회원가입 페이지로 이동
                this.$router.push({path: '/join'})
                console.log('회원가입 페이지로 이동');
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
            },
            loginNaver(){
                this.naverLogin.init();
                this.naverLogin.authorize();
                console.log('네이버 로그인 시도');
            },
            cancel() {
                // 취소 로직
                this.$router.push({path: "/"})
                console.log('취소');
            },
            closeFindIdModal(){
                this.isFindIdModalOpen = false;
            },
            closeFindPwModal(){
                this.isFindPwModalOpen = false;
            },
            // getAccessToken(code) {
            // axios.post('http://localhost:3000/naverlogin', {
            //     code: code,
            // })
            // .then((response) => {
            //     // 서버로부터 받은 응답 처리
            //     console.log(response.data);
            //     this.accessToken = response.data.accessToken;
            //     this.userData = response.data.userData;
            // })
            // .catch((error) => {
            //     console.error('네이버 로그인 처리 중 오류:', error);
            //     });
            // },
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
/* 전반적인 페이지 스타일 */
body {
    font-family: Arial, sans-serif; /* 전체 페이지의 폰트 설정 */
    background-color: #f5f5f5; /* 배경색 설정 */
    padding-bottom: 30px;
    
}
.close {
    width: 100px;
    font-size: 20px;
    cursor: pointer;
    color: #202627; /* 색상 변경 */
    border: none;
    /* background: none; */
    color: white;
    background-color: #00C7AE;
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    border-radius: 5px;
    margin-top: 25px;

}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
.line-center {
    max-width: 638px;
    margin: 10px auto;
    margin-bottom: 1px;
    height: 2px;
    background-color: #ccc;

}
/* 로그인 폼을 감싸는 컨테이너 스타일 */
.login-container {
    max-width: 600px; /* 최대 너비 설정 */
    /* height: 800px; */
    margin:  auto; /* 가운데 정렬을 위한 마진 설정 */
    margin-top: 20px;
    background: #fff; /* 배경색 설정 */
    padding: 20px; /* 안쪽 여백 설정 */
    border-radius: 8px; /* 테두리 반경 설정 */
    box-shadow: 0 0 10px rgba(0,0,0,0.1); /* 그림자 효과 설정 */
}

/* 로그인 폼 제목 스타일 */
.login-container h2 {
    font-size: 24px; /* 폰트 크기 설정 */
    text-align: center; /* 가운데 정렬 */
    margin-bottom: 20px; /* 아래 여백 설정 */
}

/* 입력 필드와 버튼을 포함하는 그룹 스타일 */
.form-group {
    margin-bottom: 20px; /* 아래 여백 설정 */
}

/* 입력 필드 레이블 스타일 */
.form-group label {
    font-weight: bold; /* 폰트 굵기 설정 */
    display: block; /* 블록 요소로 표시 */
    margin-bottom: 5px; /* 아래 여백 설정 */
}

/* 텍스트 입력 필드 스타일 */
.form-group input[type="text"],
.form-group input[type="password"] {
    width: 100%; /* 너비 100% 설정 */
    padding: 10px; /* 안쪽 여백 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    box-sizing: border-box; /* 요소의 전체 너비에 패딩 및 테두리를 포함하도록 설정 */
    font-size: 16px; /* 폰트 크기 설정 */
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    border-radius: 5px;

}
/* 라디오 버튼 스타일 */
.form_right input[type="radio"] {
    width: 20px; /* 라디오 버튼의 가로 크기 */
    height: 20px; /* 라디오 버튼의 세로 크기 */
    border-radius: 50%; /* 원형 모양으로 설정 */
    border: 2px solid #007bff; /* 테두리 스타일 및 색상 설정 */
    outline: none; /* 포커스 상태에서의 외곽선 제거 */
    cursor: pointer; /* 마우스 커서 모양 설정 */
    margin-right: 10px; /* 라디오 버튼 사이의 간격 설정 */
}
.form-group a.login-button {
    background-color: #00C7AE;
    color: rgb(255, 255, 255);
    border: none;
    height: 50px;
    font-weight: bold; /* 폰트 굵기 설정 */
    font-size: 16px;
    cursor: pointer;
    /* border-radius: 4px; */
    width: 100%;
    text-align: center; /* 텍스트 가운데 정렬 */
    display: block; /* 인라인 요소를 블록 요소로 변환하여 전체 너비를 차지하도록 설정 */
    margin-top: 10px;
    margin-bottom: 10px;
    text-decoration: none; /* 링크 기본 스타일 제거 */
    line-height: 45px;
}

.form-group a.login-button:hover {
    background-color: #0056b3;
    color: #fff;
}

.form_right{
    
    text-align: center;
    font-size: 25px;
    height: 40px;
}
.form_right input[type="radio"]:checked {
    background-color: #007bff; /* 선택된 라디오 버튼의 배경색 설정 */
}
/* 로그인 버튼 스타일 */
.form-group button {
    background-color: #00C7AE ; /* 배경색 설정 */
    color: #fff; /* 글자색 설정 */
    border: none; /* 테두리 없음 */
    font-size: 16px; /* 폰트 크기 설정 */
    height: 50px;
    cursor: pointer; /* 마우스 커서 모양 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    width: 100%; /* 너비 100% 설정 */
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    border-radius: 5px;

}

/* 로그인 버튼 호버 효과 스타일 */
.form-group button:hover {
    background-color: #0056b3; /* 호버 시 배경색 변경 */
}
#special-button {
    background-color: #03cf5d; /* 네이버 배경 */
}
#special2-button {
    background-color: #FEE500; /* 카카오톡 배경 */
    color: black;
}
.form-group .save-id-checkbox input[type="checkbox"] {
    margin-right: 10px; /* 체크박스와 텍스트 사이 간격 설정 */
    width: auto; /* 너비 자동 설정 */
}
.save-id-checkbox span{ /*체크박스 텍스트 색깔 */
    display: block; /* 블록 요소로 표시 */
    margin-bottom: 5px; /* 아래 여백 설정 */
    color: #2b2a2aa5;
}
.save-id-checkbox input[type="checkbox"] {
    width: 15px;
    height: 15px;
}
/* 비밀번호 및 아이디 찾기 링크 컨테이너 스타일 */
.form-group.forgot-password {
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 가로 중앙 정렬 */
    cursor: pointer; /* 마우스 커서 모양 설정 */
}

/* 아이디 찾기 및 비밀번호 찾기 링크 스타일 */
.form-group.forgot-password a {
    margin: 0 10px; /* 링크 사이의 간격 설정 */
    color: #2b2a2aa5; /* 링크 색상 설정 */
    text-decoration: none; /* 밑줄 제거 */
}

/* 아이디 찾기 및 비밀번호 찾기 링크 호버 효과 스타일 */
.form-group.forgot-password a:hover {
    text-decoration: underline; /* 호버 시 밑줄 추가 */
}

.input-with-icon {
    position: relative;
    display: flex; /* Flexbox를 사용하여 내부 요소를 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
}

.input-with-icon .icon {
    width: 40px; /* 이미지 너비 설정 */
    height: auto; /* 이미지 높이 자동으로 설정 */
    

}

.input-with-icon input[type="text"] {
    width: 100%; /* 입력 필드 너비 설정 (이미지 너비 + 간격 포함) */
    padding: 10px; /* 안쪽 여백 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    font-size: 16px; /* 폰트 크기 설정 */
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    border-radius: 5px;
}


</style>