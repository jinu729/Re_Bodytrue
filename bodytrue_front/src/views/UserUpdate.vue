<template>
  <div>
    <div class="join_main">
      <div class="join_wrap">
        <div class="main_title">
          <h2>회원정보 수정</h2>
        </div>
        <div class="join_list">
          <form @submit.prevent="updateUserInfo">
            <div class="form_group">
              <div class="form_left">
                <span>&nbsp;&nbsp;&nbsp;이메일</span>
              </div>
              <div class="form_right">&nbsp;&nbsp;
                <input type="email" id="email1" v-model="userData.user_email" disabled>
              </div>
            </div>
            <div class="form_group">
              <div class="form_left">
                <span>&nbsp;&nbsp;&nbsp;비밀번호</span>
              </div>
              <div class="form_right">&nbsp;&nbsp;
                <input type="password" id="password1" v-model="userData.user_password">
                <span class="confirm">(영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8~20자)</span>
              </div>
            </div>
            <div class="form_group">
              <div class="form_left">
                <span>&nbsp;&nbsp;&nbsp;비밀번호 확인</span>
              </div>
              <div class="form_right">&nbsp;&nbsp;
                <input type="password" id="password2" v-model="userPasswordConfirm">
                <button type="button" class="btn_confirm1" @click="checkPasswordMatch">비밀번호확인</button>
              </div>
            </div>
            <div class="form_group">
              <div class="form_left">
                <span>&nbsp;&nbsp;&nbsp;휴대전화번호</span>
              </div>
              <div class="form_right">&nbsp;&nbsp;
                <select v-model="userData.user_tel1">
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="012">012</option>
                </select>
                <span> - </span>
                <input type="text" v-model="userData.user_tel2">
                <span> - </span>
                <input type="text" v-model="userData.user_tel3">
              </div>
            </div>
            <div class="join_btn">
              <button type="submit" id="clear">수정완료</button>
              <button type="button" @click="cancelUpdate" id="exit">수정취소</button>
            </div>
            <div class="join_btn2">
              <button type="button" @click="deleteuser" id="del">회원탈퇴</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="join_wrap"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
        return{
            userData: {
                user_name: '',
                user_email: '',
                user_tel: '',
                user_no: '',
                user_pwd: ''
            }
          };
        },
        created(){
          this.myinfo();
        },
        computed:{
          user() {
            return this.$store.state.user;
          }
        },
        methods:{
          async myinfo(){
            const user_no = this.$route.params.user_no;
            axios.post(`http://localhost:3000/user/userupdate/${user_no}`)
            .then(response => {
                this.userData = response.data[0];
            })
            .catch(error => {
                console.error("마이페이지 에러 발생", error);
            })
        },
        //회원 정보 삭제하기
        async deleteuser(user_no){
            console.log("user_no",user_no);
            try{
                const response = await axios.post(`http://localhost:3000/user/deleteuser`, {user_no: user_no});
                console.log("회원 정보 삭제 성공", response.data);
                alert('회원 정보가 삭제 되었습니다.');
            } catch(error){
                console.error("회원 정보 삭제 도중 에러 발생",error);
            }
        },
        
      

      }
    
}

    </script>
    
    
    <style scoped>
    /* join */
  
  /* join_main */
  .join_main {
    width: 100%;
    height: 85%;
    position: relative;
  }
  .join_main .join_wrap {
    width: 60%;
    height: 100%;
    margin: 0 auto;
  }
  .join_main .main_title {
    width: 100%;
    height: 15%;
    padding-bottom: 10px;
    display: flex;
    align-items: end;
    border-bottom: 1px solid black;
  }
  .join_main .join_list {
    width: 100%;
    padding-top: 10px;
  }
  .join_list .form_group {
    display: flex;
    flex-wrap: wrap;
    /* border: 1px solid black; */
    height: 40px;
    line-height: 40px;
  }
  .form_group .form_left {
    width: 15%;
    border: 1px solid black;
    font-size: 18px;
    background-color: rgba(218, 218, 218, 0.5);
    height: 40px;
  }
  .form_group .form_right {
    border: 1px solid black;
    width: 84.5%;
    height: 40px;
  }
  #email1 {
    width: 400px;
    line-height: 20px;
    margin: 0 auto;
    font-size: 16px;
  }
  #email2 {
    width: 150px;
    height: 24px;
    font-size: 16px;
  }
  .form_right .confirm {
    font-size: 14px;
    color: gray;
  }
  .form_right .btn_confirm {
    width: 100px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
  }
  #password1 {
    width: 400px;
    line-height: 20px;
  }
  #password2 {
    width: 400px;
    line-height: 20px;
  }
  .form_right .btn_confirm1 {
    width: 150px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
  }
  #username {
    height: 20px;
    font-size: 16px;
  }
  .form_group:nth-child(7) {
    height: 120px;
  }
  .form_group:nth-child(7) .form_left {
    height: 120px;
    line-height: 120px;
  }
  .form_group:nth-child(7) .form_right {
    border: 0;
  }
  .form_right .address_group {
    display: flex;
    flex-direction: column;
    height: 120px;
  }
  .address_group .address_row {
    border: 1px solid black;
    height: 39px;
  }
  #postcode {
    line-height: 20px;
    font-size: 16px;
  }
  .address_row .address_search {
    width: 100px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
  }
  #address, #address-detail {
    width: 300px;
    line-height: 20px;
    font-size: 16px;
  }
  #number1 {
    height: 22px;
    font-size: 16px;
  }
  #number2, #number3 {
    height: 20px;
    width: 50px;
    font-size: 16px;
  }
  .join_wrap .join_btn {
    width: 100%;
    height: 10%;
    padding-top: 40px;
    text-align: center;
  }
  .join_wrap .join_btn2 {
    width: 100%;
    height: 10%;
    padding-top: 40px;
    text-align: right;
  }
  #clear, #exit {
    width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
  }
  #clear {
    background-color: #00C7AE;
  }
  
  #del {
    width: 100px;
    font-size: 18px;
    margin: 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: rgba(233, 4, 4, 0.5);
  }
  </style>
  