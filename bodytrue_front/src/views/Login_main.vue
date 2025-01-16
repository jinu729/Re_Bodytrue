<template>
    <div class="login_main">
        <div class="login_wrap">
            <div class="main_title">
                <h2 style="font-weight: bold;">로그인</h2>
            </div>
            <div class="member_type">
                <div class="mem_user">
                    <button class="btn_user" @click="login_type('user')">
                        <h2>일반회원</h2>
                        <p>운동 서비스와 트레이너를 이용하고 싶다면?</p>
                    </button>
                </div>
                <div class="mem_trainer">
                    <button class="btn_trainer" @click="login_type('trainer')">
                        <h2>트레이너</h2>
                        <p>운동 코칭 전문가로 활동하고 싶다면?</p>
                    </button>
                </div>
            </div>   
        </div>        
    </div>
</template>
<script>

export default {    
    data() {
        return {
           
        };
    },
    methods: {
        login_type(type){
            if(type === 'user'){
                //일반 회원 페이지로 이동
                this.$router.push('/login_user')
            } else if(type === 'trainer') {
                //트레이너 페이지로 이동
                this.$router.push('/login_trainer')
            }
        }
       
    }
}
</script>
<style scoped>
.login_main{
    width: 100%;
    height: 85%;
    position: relative;
    padding-top: 50px;
}
.login_main .login_wrap{
    width: 60%;
    height: 100%;
    margin: 0 auto;
}
.login_main .main_title{
    width: 100%;
    height: 15%;
    padding-bottom: 10px;
    display: flex;
    align-items: end;
    border-bottom: 1px solid #00a0ab;
    justify-content: center;
    color:#1d1d1d;
}
.login_main .member_type{
    width: 100%;
    display: flex;
    margin: 0 auto;
    margin-top: 150px;
    justify-content: center;
}
.member_type .mem_user{
    width: 400px;
    height: 120px;
    /* width: 50%; */
    text-align: center;
    border-radius: 25px;
    margin-right: 25px;
    /* padding-top: 20px; */
    /* padding-bottom: 10px; */
    background: #3fced3;
}
.mem_user .btn_user, .mem_trainer .btn_trainer{
    border: 0;
    background: 0;
    width: 400px;
    height: 120px;
    border-radius: 25px;
    padding-top: 15px;
    box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
}
.mem_user .btn_user:hover, .mem_trainer .btn_trainer:hover{
    background: #3fd389 ;
    border: 0;
    box-shadow: 1px 1px 5px rgba(63, 211, 137, 0.5);
}
.mem_user h2, .mem_user p, .mem_trainer h2, .mem_trainer p{
    color: white;
}
.member_type .mem_trainer{
    width: 400px;
    /* width: 50%; */
    text-align: center;
    border-radius: 25px;
    margin-left: 25px;
    /* padding-top: 20px;
    padding-bottom: 10px; */
    background: #3fced3;
}
</style>