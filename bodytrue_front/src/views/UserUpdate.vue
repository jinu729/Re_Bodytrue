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
                <input type="password" id="password1" v-model="userData.user_pwd" name="password1">
                <span class="confirm">(영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8~20자)</span>
              </div>
              <div v-if="errors.password1" class="error" hidden>{{ errors.password1 }}</div>
            </div>
            <div class="form_group">
              <div class="form_left">
                <span>&nbsp;&nbsp;&nbsp;비밀번호 확인</span>
              </div>
              <div class="form_right">&nbsp;&nbsp;
                <input type="password" id="password2" v-model="password2" name="password2">
                <button type="button" class="btn_confirm1" @click="confirm_password">비밀번호확인</button>
              </div>
              <div v-if="errors.password2" class="error" hidden>{{ errors.password2 }}</div>
            </div>
            <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;이름</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="text" id="username" v-model="userData.user_name" name="username" disabled>
                        </div>                        
                    </div>   
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;가입자 유형</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <label for="user">
                                <input type="radio" id="user" v-model="user_auth" name="auth" value="1" checked disabled> 회원 &nbsp;&nbsp;
                            </label>
                            <label for="trainer">
                                <input type="radio" id="trainer" v-model="user_auth" name="auth" value="2" disabled> 트레이너
                            </label>
                        </div>                        
                    </div>     
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;성별</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <label for="men">
                                <input type="radio" id="men" v-model="userData.user_sex" name="sex" value="M" disabled > 남자 &nbsp;&nbsp;
                            </label>
                            <label for="women">
                                <input type="radio" id="women" v-model="userData.user_sex" name="sex" value="F" disabled > 여자
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
                                    <input type="text" id="postcode" name="postcode" v-model="userData.user_addno" placeholder="우편번호" required>
                                    <button type="button" class="address_search" @click="zipload">주소 검색</button>
                                </div>
                                <div class="address_row">&nbsp;&nbsp;
                                    <input type="text" id="address" name="address" v-model="userData.user_add1" placeholder="기본 주소">
                                </div>
                                <div class="address_row">&nbsp;&nbsp;
                                    <input type="text" id="address_detail" name="address_detail" v-model="userData.user_add2" placeholder="상세 주소">
                                </div>
                            </div>
                        </div>
                        <div v-if="errors.address" class="error" hidden>{{ errors.address }}</div>
                    </div>   
                    </form>
                    <div class="form_group">
                      <div class="form_left">
                        <span>&nbsp;&nbsp;&nbsp;휴대전화번호</span>
                      </div>
                      <div class="form_right">&nbsp;&nbsp;
                        <select name="number1" v-model="userData.user_tel1" id="number1">
                          <option value="010">010</option>
                          <option value="011">011</option>
                          <option value="012">012</option>
                        </select>
                        <span> - </span>
                        <input type="text" name="number2" v-model="userData.user_tel2" id="number2">
                        <span> - </span>
                        <input type="text" name="number3" v-model="userData.user_tel3" id="number3">
                      </div>
                    </div>
                    <div v-if="errors.phone" class="error" hidden>{{ errors.phone }}</div>
            <div class="join_btn">

              <button type="submit" @click="updateuser(user.user_no)" id="clear">수정완료</button>
              <button type="button" @click="exit" id="exit">수정취소</button>
                <button  type="button" @click="deleteuser(user.user_no)" id="del">회원탈퇴</button>
            </div>
          </div>
        </div>
      </div>
      <div class="join_wrap"></div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  data(){
        return{
            userData: {
              user_name: '',
              user_email: '',
              user_tel: '',
              user_no: '',
              user_pwd: '',
              user_addno: '',
              user_add1: '',
              user_add2: '',
              user_sex:''
            },
            zipcode : '',
            address: '',
            address_detail: '',
            password1: '',
            password2: '',
            errors: {}
          }
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
          validateForm() {
            this.errors = {};

            // 비밀번호 유효성 검사
            if (!this.userData.user_pwd) {
                this.errors.password1 = '비밀번호를 입력해 주세요.';
                alert(this.errors.password1);
                return false;
            } else {
                const password = this.userData.user_pwd;
                if (password.length < 8 || password.length > 20) {
                    this.errors.password1 = '비밀번호는 8~20자 사이여야 합니다.';
                    alert(this.errors.password1);
                    return false;
                }
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumbers = /\d/.test(password);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                const typesCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;
                if (typesCount < 3) {
                    this.errors.password1 = '비밀번호는 영문 대소문자, 숫자, 특수문자 중 세 가지 이상을 포함해야 합니다.';
                    alert(this.errors.password1);
                    return false;
                }
            }

               // 비밀번호 확인 유효성 검사
      if (this.userData.user_pwd !== this.password2) {
        this.errors.password2 = '비밀번호가 일치하지 않습니다.';
        alert(this.errors.password2);
        return false;
      }

      // 주소 유효성 검사
      if (!this.userData.user_addno || !this.userData.user_add1) {
        this.errors.address = '주소를 입력해 주세요.';
        alert(this.errors.address);
        return false;
      }

      // 전화번호 유효성 검사
      if (!this.userData.user_tel2 || !this.userData.user_tel3) {
        this.errors.phone = '휴대전화번호를 입력해 주세요.';
        alert(this.errors.phone);
        return false;
      }

            return true;
        },
          async myinfo(){
            const user_no = this.$route.params.user_no;
            axios.post(`http://localhost:3000/user/userupdate/${user_no}`)
            .then(response => {
                this.userData = response.data[0];
                this.userData.user_sex = response.data[0].user_sex; // 성별 정보 설정
            })
            .catch(error => {
                console.error("정보수정페이지 에러 발생", error);
            })
        },
        //회원 정보 삭제하기
        ...mapMutations(['setUser']),
    async deleteuser(user_no){
      if (confirm('정말로 회원 정보를 삭제하시겠습니까?')) {
        console.log("user_no", user_no);
        try{
          const response = await axios.post(`http://localhost:3000/user/deleteuser`, { user_no: user_no });
          console.log("회원 정보 삭제 성공", response.data);
          alert('회원 정보가 삭제 되었습니다.');
          this.setUser({ user_email: '', user_no: '', user_auth: '' });
          localStorage.clear(); // 로컬 스토리지 비우기
          this.$router.push('/');  // 메인 화면으로 리디렉션
        } catch(error){
          console.error("회원 정보 삭제 도중 에러 발생", error);
        }
      } else {
        console.log("회원 정보 삭제가 취소되었습니다.");
      }
    },
    // 비밀번호 일치 검사
    confirm_password() {
            const password = this.userData.user_pwd;
            const passwordConfirm = this.password2;

            // Check if passwords match
            if (password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            // Check length of password
            if (password.length < 8 || password.length > 20) {
                alert('비밀번호는 8~20자 사이여야 합니다.');
                return;
            }

            // Check if password contains at least three types of characters
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            const typesCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;

            if (typesCount < 3) {
                alert('비밀번호는 영문 대소문자, 숫자, 특수문자 중 세 가지 이상을 포함해야 합니다.');
                return;
            }

            alert('비밀번호가 일치합니다.');
        },
        zipload() {
            // 주소 검색 로직
            new window.daum.Postcode({
                oncomplete: (data) => {
                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = '';
                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            // addr += ' ';
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            // addr += ' ';
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                    }
                    this.userData.user_addno = data.zonecode;
                    this.userData.user_add1 = addr;
                    this.userData.user_addn2 = extraAddr;
                }
            }).open();
        },
        //회원 정보 수정
        ...mapMutations(['setUser']),
        async updateuser(user_no) {
          if (!this.validateForm()) {
                return;
            }
          const user_tel = this.userData.user_tel1 + '-' + this.userData.user_tel2 + '-' + this.userData.user_tel3;
      const user = {
        user_no: user_no,
        user_addno: this.userData.user_addno,
        user_add1: this.userData.user_add1,
        user_add2:this.userData.user_add2,
        user_pwd: this.userData.user_pwd,
        user_tel: user_tel,
      };
      try {
          const response = await axios.post(`http://localhost:3000/user/updateuser`, user);
        // // 서버에 회원정보 데이터를 전송
        console.log("회원 정보 수정 성공",response.data);
        alert('회원 정보가 수정되었습니다.');
        this.$router.push('/');  // 메인 화면으로 리디렉션
      } catch (error) {
        console.error("회원 정보 수정 도중 에러 발생",error);
        alert('회원 정보 수정 중 오류가 발생했습니다.');
      }
    },
    exit(){
            this.$router.push({path: "/"})
    }

    }
        
}

    </script>
    
    
    <style scoped>
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
    border-bottom: 1px solid #00a0ab;
    justify-content: center;
    color:#1d1d1d;
}
.join_main .join_list{
    width: 100%;
    padding-top: 25px;
    padding-left: 5px;
}
.join_list .form_group{
    display: flex;
    flex-wrap: wrap;
    /* border: 1px solid black; */
    height: 40px;
    line-height: 40px;
    /* margin-top: 10px; */
}
.form_group .form_left{
    width: 15%;
    border: 1px solid #bbdcdf;
    font-size: 18px;
    background-color: #4fced2;
    color: white;
    height: 40px;
    border-radius: 5px 0 0 5px;
}
.form_group .form_right{
    width: 84.5%;
    height: 40px;
    border: 1px solid #bbdcdf;
    border-radius: 0 5px 5px 0;
}
#email1{
    width: 230px;
    line-height: 20px;
    margin: 0 auto;
    font-size: 16px;
    height: 27px;
    border: 1px solid #bbdcdf;
    padding-left: 5px;
}
#email2{
    width: 150px;
    font-size: 16px;
    border: 1px solid #bbdcdf;
}
.form_right .confirm{
    font-size: 14px;
    color: gray;
}
.form_right .btn_confirm{
    width: 100px;
    height: 27px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
    background-color:#fd9c8f;
    color:white;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 1px 1px 5px rgba(255, 117, 202, 0.5);
}
.form_right .btn_confirm:hover{
    width: 100px;
    height: 27px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
    background-color:white;
    color:#fd9c8f;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 1px 1px 5px rgba(255, 117, 202, 0.5);
}
#password1{
    width: 400px;
    line-height: 20px;
    height: 27px;
    border: 1px solid #bbdcdf;
    padding-left: 5px;
}
#password2{
    width: 400px;
    line-height: 20px;
    height: 27px;
    border: 1px solid #bbdcdf;
    padding-left: 5px;
}
.form_right .btn_confirm1{
    width: 150px;
    height: 27px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
    background-color:#fd9c8f;
    color:white;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 1px 1px 5px rgba(255, 117, 202, 0.5);
}
.form_right .btn_confirm1:hover{
    width: 150px;
    height: 27px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 20px;
    background-color:white;
    color:#fd9c8f;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 1px 1px 5px rgba(255, 117, 202, 0.5);
}
#username{
    border: 1px solid #bbdcdf;
    height: 27px;
    font-size: 16px;
    padding-left: 5px;
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
    border-radius: 0 5px 5px 0;
    border: 1px solid #bbdcdf;
    height: 40px;
}
#postcode{
    line-height: 20px;
    font-size: 16px;
    height: 27px;
    border: 1px solid #bbdcdf;
    padding-left: 5px;
}
.address_row .address_search{
    width: 100px;
    height: 27px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 22px;
    background-color:#f2c444;
    /* color:rgb(69, 63, 61); */
    color: white;
    border-radius: 5px;
    border: none;
    box-shadow: 1px 1px 5px rgba(255, 218, 5, 0.5);
}

.address_row .address_search:hover{
    width: 100px;
    font-size: 16px;
    margin-left: 10px;
    line-height: 22px;
    background-color:rgb(255, 241, 207);
    color:#f2c444;
    border-radius: 5px;
    border: none;
    box-shadow: 1px 1px 5px rgba(255, 218, 5, 0.5);
}
#address, #address_detail{
    width: 300px;
    line-height: 20px;
    font-size: 16px;
    height: 27px;
    border: 1px solid #bbdcdf;
    padding-left: 5px;
}
#number1{
    height: 27px;
    border: 1px solid #bbdcdf;
    font-size: 16px;
}
#number2, #number3{
    height: 27px;
    width: 64px;
    font-size: 16px;
    border: 1px solid #bbdcdf;
}
.join_wrap .join_btn{
    width: 100%;
    height: 10%;
    padding-top: 40px;
    text-align: center;
}

#clear{
    width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color:#3fced3;
    color:white;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
}
#clear:hover{
    width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color:#ffffff;
    color:#3fced3;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
}
#exit{
    width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #d0d0d0;
    color: white;
}
#exit:hover{
    width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #ff5151;
    color: rgb(0, 0, 0);
} 
.btndel{
  margin: 0 220px;
}
  #del {
    width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: rgba(233, 4, 4, 0.5);
  }
  #del:hover{
    width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #ff5151;
    color: rgb(0, 0, 0);
} 

  </style>
  