<template>
    <div class="join_main">
        <div class="join_wrap">
            <form @submit.prevent="onSubmitForm">
            <div class="main_title">
                <h2 style="font-weight: bold;">회원가입</h2>
            </div>
            <div class="join_list">
                <form action="#" method="post">
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;이메일</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="email" v-model="user_email1" id="email1" name="email" maxlength="16" placeholder="이메일"> 
                            <span>&nbsp;@&nbsp;</span>
                            <select name="email" v-model="user_email2" id="email2">
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="nate.com">nate.com</option>
                                <option value="hanmail.com">hanmail.com</option>
                            </select>
                            <span class="confirm">&nbsp;&nbsp;(영소문자/숫자,3~16자)</span>
                            <button type="button" class="btn_confirm" @click="confirm_email">중복확인</button>
                        </div>  
                        <div v-if="errors.email" class="error" hidden>{{ errors.email }}</div>                      
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;비밀번호</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="password" id="password1" v-model="password1" name="password1" maxlength="20" placeholder="비밀번호">
                            <span class="confirm">&nbsp;&nbsp;(영문 대소문자/숫자/특수문자 중 3가지 이상 조합,8~20자)</span>
                        </div>
                        <div v-if="errors.password1" class="error" hidden>{{ errors.password1 }}</div>                          
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;비밀번호 확인</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="password" id="password2" v-model="password2" name="password2" maxlength="20" placeholder="비밀번호 확인">
                            <button type="button" class="btn_confirm1" @click="confirm_password">비밀번호확인</button>
                        </div> 
                        <div v-if="errors.password2" class="error" hidden>{{ errors.password2 }}</div>                          
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;이름</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="text" id="username" v-model="user_name" name="username" placeholder="이름">
                        </div>  
                        <div v-if="errors.user_name" class="error" hidden>{{ errors.user_name }}</div>                      
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;가입자 유형</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <label for="trainer">
                                <input type="radio" id="trainer" v-model="user_auth" name="auth" value="2" checked> 트레이너
                            </label>
                        </div>                
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;성별</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <label for="men">
                                <input type="radio" id="men" v-model="gender" name="sex" value="M"> 남자 &nbsp;&nbsp;
                            </label>
                            <label for="women">
                                <input type="radio" id="women" v-model="gender" name="sex" value="F"> 여자
                            </label>
                        </div>   
                        <div v-if="errors.gender" class="error" hidden>{{ errors.gender }}</div>                     
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;주소</span>
                        </div>
                        <div class="form_right">
                            <div class="address_group">
                                <div class="address_row">&nbsp;&nbsp;
                                    <input type="text" id="postcode" name="postcode" v-model="zipcode" placeholder="우편번호" required>
                                    <button type="button" class="address_search" @click="zipload">주소 검색</button>
                                </div>
                                <div class="address_row">&nbsp;&nbsp;
                                    <input type="text" id="address" name="address" v-model="address" placeholder="기본 주소">
                                </div>
                                <div class="address_row">&nbsp;&nbsp;
                                    <input type="text" id="address_detail" name="address_detail" v-model="address_detail" placeholder="상세 주소">
                                </div>
                            </div>
                        </div>
                        <div v-if="errors.address" class="error" hidden>{{ errors.address }}</div>
                    </div>    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;휴대전화번호</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <select name="number1" v-model="number1" id="number1">
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="012">012</option>
                            </select>
                            <span> - </span>
                            <input type="text" name="number2" v-model="number2" id="number2" maxlength="4">
                            <span> - </span>
                            <input type="text" name="number3" v-model="number3" id="number3" maxlength="4">
                        </div>                        
                    </div>  
                    <div v-if="errors.phone" class="error" hidden>{{ errors.phone }}</div>                
                </form>
            </div>
            <div class="join_btn">
                <button type="submit" name="clear" id="clear">회원가입</button>
                <button type="button" name="exit" id="exit" @click="exit">취소</button>
            </div>
        </form>
        </div>        
    </div>
</template>
<script>
import axios from 'axios';

export default {    
    data() {
        return {
            user_email1: '',
            user_email2: 'naver.com',
            password1: '',
            password2: '',
            user_name: '',
            user_auth: '',
            gender: '',
            zipcode : '',
            address: '',
            address_detail: '',
            number1: '010',
            number2: '',
            number3: '',
            errors: {},
        };
    },
    methods: {
        validateForm() {
            this.errors = {};

            // 이메일 유효성 검사
            if (!this.user_email1) {
                this.errors.email = '이메일을 입력해 주세요.';
                this.$swal(this.errors.email);
                return false;
            } else if (this.user_email1.length < 3 || this.user_email1.length > 16) {
                this.errors.email = '이메일은 3~16자 사이여야 합니다.';
                this.$swal(this.errors.email);
                return false;
            }

            // 비밀번호 유효성 검사
            if (!this.password1) {
                this.errors.password1 = '비밀번호를 입력해 주세요.';
                this.$swal(this.errors.password1);
                return false;
            } else {
                const password = this.password1;
                if (password.length < 8 || password.length > 20) {
                    this.errors.password1 = '비밀번호는 8~20자 사이여야 합니다.';
                    this.$swal(this.errors.password1);
                    return false;
                }
                const hasUpperCase = /[A-Z]/.test(password);
                const hasLowerCase = /[a-z]/.test(password);
                const hasNumbers = /\d/.test(password);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
                const typesCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;
                if (typesCount < 3) {
                    this.errors.password1 = '비밀번호는 영문 대소문자, 숫자, 특수문자 중 세 가지 이상을 포함해야 합니다.';
                    this.$swal(this.errors.password1);
                    return false;
                }
            }

            // 비밀번호 확인 유효성 검사
            if (this.password1 !== this.password2) {
                this.errors.password2 = '비밀번호가 일치하지 않습니다.';
                this.$swal(this.errors.password2);
                return false;
            }

            // 이름 유효성 검사
            if (!this.user_name) {
                this.errors.user_name = '이름을 입력해 주세요.';
                this.$swal(this.errors.user_name);
                return false;
            }

            // 가입자 유형 유효성 검사
            if (!this.user_auth) {
                this.errors.user_auth = '가입자 유형을 선택해 주세요.';
                this.$swal(this.errors.user_auth);
                return false;
            }

            // 성별 유효성 검사
            if (!this.gender) {
                this.errors.gender = '성별을 선택해 주세요.';
                this.$swal(this.errors.gender);
                return false;
            }

            // 주소 유효성 검사
            if (!this.zipcode || !this.address) {
                this.errors.address = '주소를 입력해 주세요.';
                this.$swal(this.errors.address);
                return false;
            }

            // 전화번호 유효성 검사
            if (!this.number2 || !this.number3) {
                this.errors.phone = '휴대전화번호를 입력해 주세요.';
                this.$swal(this.errors.phone);
                return false;
            }

            return true;
        },
        async confirm_email() {

            if (this.user_email1.length < 3 || this.user_email1.length > 16) {
                this.$swal('이메일은 3~16자 사이여야 합니다.');
                return;
            }
           
                const email = `${this.user_email1}@${this.user_email2}`; 
                try {
                    const response = await axios.post('http://localhost:3000/auth/email_check',{email});
                    console.log(`확인할 이메일: ${email}`);
                    // console.log(response.data);
                    if (response.data.exists) {
                        this.$swal('이미 존재하는 이메일입니다.');
                        // console.log(response.data.exists)
                    } else {
                        this.$swal('사용 가능한 이메일입니다.');
                    }
                } catch (error) {
                    console.error('이메일 확인 중 오류가 발생했습니다:', error);
                    this.$swal('이메일 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            
        },
        confirm_password() {
            const password = this.password1;
            const passwordConfirm = this.password2;

            // Check if passwords match
            if (password !== passwordConfirm) {
                this.$swal('비밀번호가 일치하지 않습니다.');
                return;
            }

            // Check length of password
            if (password.length < 8 || password.length > 20) {
                this.$swal('비밀번호는 8~20자 사이여야 합니다.');
                return;
            }

            // Check if password contains at least three types of characters
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            const typesCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;

            if (typesCount < 3) {
                this.$swal('비밀번호는 영문 대소문자, 숫자, 특수문자 중 세 가지 이상을 포함해야 합니다.');
                return;
            }

            this.$swal('비밀번호가 일치합니다.');
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
                    this.zipcode = data.zonecode;
                    this.address = addr;
                    this.addressde = extraAddr;
                }
            }).open();
        },

        async onSubmitForm() {
            if (!this.validateForm()) {
                return;
            }
            
            const endpoint = 'trainer_join';
            const data = {
                email: `${this.user_email1}@${this.user_email2}`,
                user_password: this.password1,
                user_name: this.user_name,
                gender: this.gender,
                postcode: this.zipcode,
                user_add1: this.address,
                user_add2: this.address_detail,
                user_tel: `${this.number1}-${this.number2}-${this.number3}`,
                user_auth: this.user_auth,
            };
            console.log('Sending data:', data);

            try {
                const response = await axios.post(`http://localhost:3000/auth/${endpoint}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
                console.log('폼 제출 성공', response.data);
                this.$swal('회원 가입을 축하드립니다.');
                this.$router.push({ path: '/login'});
            } catch (error) {
                console.error('폼 제출 중 오류 발생', error);
            }
        },
        exit(){
            if (Object.values(this.$data).some(field => field)) {
                if (confirm("회원가입을 취소하시겠습니까?")) {
                    this.$router.push({ path: "/login" });
                }
            } else {
                this.$router.push({ path: "/" });
            }
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
    width: 130px;
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
    width: 70px;
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
    width: 120px;
    height: 35px;
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
    width: 120px;
    height: 35px;
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
    width: 120px;
    height: 35px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #d0d0d0;
    color: white;
}
#exit:hover{
    width: 120px;
    height: 35px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #ff5151;
    color: rgb(0, 0, 0);
}
</style>