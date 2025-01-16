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
            <div class="common_login">
                <h3>일반 로그인</h3>
                <div class="common_total">
                    <div class="common_email">
                        <label for="email">이메일</label><br>
                        <input type="text" id="common_email" name="email" placeholder="이메일">
                    </div>
                    <div class="common_psd">
                        <label for="password">비밀번호</label><br>
                        <input type="text" id="common_psd" name="password" placeholder="비밀번호">
                    </div>
                    <div class="common_forgot">
                        <a @click="goEmailFind">아이디 찾기</a>
                        <span style="color: #ccc">|</span>
                        <a @click="goPwdFind">비밀번호 찾기</a>
                    </div>
                    <div class="login_btn">
                        <button type="submit" class="com_login">로그인</button>
                        <button type="button" class="com_join">회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

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
.total_login .sns_login, .total_login .common_login{
    width: 49.7%;
    height: 100%;
    text-align: center;
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
}
.common_forgot a{
    padding: 8px;
    color: #ccc;
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