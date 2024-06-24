<template>
    <div class="join_main">
        <div class="join_wrap" @submit.prevent="onSubmitForm">
            <div class="main_title">
                <h2>회원가입</h2>
            </div>
            <div class="join_list">
                <form action="#" method="post">
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;이메일</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="email" v-model="user_email1" id="email1" name="email"> 
                            <span>&nbsp;@&nbsp;</span>
                            <select name="email" v-model="user_email2" id="email2">
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="nate.com">nate.com</option>
                                <option value="hanmail.com">hanmail.com</option>
                            </select>
                            <span class="confirm">&nbsp;&nbsp;(영소문자/숫자,4~16자)</span>
                            <button type="button" class="btn_confirm" @click="confirm_email">중복확인</button>
                        </div>                        
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;비밀번호</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="password" id="password1" v-model="password1" name="password1">
                            <span class="confirm">&nbsp;&nbsp;(영문 대소문자/숫자/특수문자 중 3가지 이상 조합,8~20자)</span>
                        </div>                        
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;비밀번호 확인</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="password" id="password2" v-model="password2" name="password2">
                            <button type="button" class="btn_confirm1" @click="confirm_password">비밀번호확인</button>
                        </div>                        
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;이름</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="text" id="username" name="username">
                        </div>                        
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;이용자</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <label for="user">
                                <input type="radio" id="user" name="auth" value="user"> 회원 &nbsp;&nbsp;
                            </label>
                            <label for="trainer">
                                <input type="radio" id="trainer" name="auth" value="trainer"> 트레이너
                            </label>
                        </div>                        
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;성별</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <label for="men">
                                <input type="radio" id="men" name="gender" value="M"> 남자 &nbsp;&nbsp;
                            </label>
                            <label for="women">
                                <input type="radio" id="women" name="gender" value="F"> 여자
                            </label>
                        </div>                        
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;주소</span>
                        </div>
                        <div class="form_right">
                            <div class="address_group">
                                <div class="address_row">&nbsp;&nbsp;
                                    <input type="text" id="postcode" name="postcode" placeholder="우편번호" required>
                                    <button type="button" class="address_search" @click="zipload">주소 검색</button>
                                </div>
                                <div class="address_row">&nbsp;&nbsp;
                                    <input type="text" id="address" name="address" placeholder="기본 주소">
                                </div>
                                <div class="address_row">&nbsp;&nbsp;
                                    <input type="text" id="address-detail" name="address-detail" placeholder="상세 주소">
                                </div>
                            </div>
                        </div>
                    </div>    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;휴대전화번호</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <select name="number1" id="number1">
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="012">012</option>
                            </select>
                            <span> - </span>
                            <input type="text" name="number2" id="number2">
                            <span> - </span>
                            <input type="text" name="number3" id="number3">
                        </div>                        
                    </div>                  
                </form>
            </div>
            <div class="join_btn">
                <button type="submit" name="clear" id="clear">회원가입</button>
                <button type="button" name="exit" id="exit">취소</button>
            </div>
        </div>        
    </div>
</template>
<script>
export default {
    data() {
        return {
            sampleData: ''
        };
    }
}
</script>
<style>
.join_main{
    width: 100%;
    height: 85%;
    position: relative;
    padding-top: 50px;
}
.join_main .join_wrap{
    width: 60%;
    height: 100%;
    margin: 0 auto;
}
.join_main .main_title{
    width: 100%;
    height: 15%;
    padding-bottom: 10px;
    display: flex;
    align-items: end;
    border-bottom: 1px solid black;
}
.join_main .join_list{
    width: 100%;
    padding-top: 10px;
}
.join_list .form_group{
    display: flex;
    flex-wrap: wrap;
    /* border: 1px solid black; */
    height: 40px;
    line-height: 40px;
}
.form_group .form_left{
    width: 15%;
    border: 1px solid black;
    font-size: 18px;
    background-color: rgba(218, 218, 218, 0.5);
    height: 40px;
}
.form_group .form_right{
    border: 1px solid black;
    width: 84.5%;
    height: 40px;
}
#email1{
    width: 130px;
    line-height: 20px;
    margin: 0 auto;
    font-size: 16px;
}
#email2{
    width: 150px;
    height: 24px;
    font-size: 16px;
}
.form_right .confirm{
    font-size: 14px;
    color: gray;
}
.form_right .btn_confirm{
    width: 100px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
}
#password1{
    width: 400px;
    line-height: 20px;
}
#password2{
    width: 400px;
    line-height: 20px;
}
.form_right .btn_confirm1{
    width: 150px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
}
#username{
    height: 20px;
    font-size: 16px;
}
.form_group:nth-child(7){
    height: 120px;
}
.form_group:nth-child(7) .form_left{
    height: 120px;
    line-height: 120px;
}
.form_group:nth-child(7) .form_right{
    border: 0;
}
.form_right .address_group{
    display: flex;
    flex-direction: column;
    height: 120px;
}
.address_group .address_row{
    border: 1px solid black;
    height: 39px;
}
#postcode{
    line-height: 20px;
    font-size: 16px;
}
.address_row .address_search{
    width: 100px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
}
#address, #address-detail{
    width: 300px;
    line-height: 20px;
    font-size: 16px;
}
#number1{
    height: 22px;
    font-size: 16px;
}
#number2, #number3{
    height: 20px;
    width: 50px;
    font-size: 16px;
}
.join_wrap .join_btn{
    width: 100%;
    height: 10%;
    padding-top: 40px;
    text-align: center;
}
#clear, #exit{
    width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
}
</style>