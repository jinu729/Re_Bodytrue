<template>
    <div class="mypage_main">
        <div class="section1">
            <div class="profile">
                <div class="pro_left">                   
                    <div class="upload_img">
                        <img id="profile-picture" class="profile-picture" src="../image/user2.png" alt="Profile Picture">
                        <div class="file-input">
                            <input type="file" id="image-upload" accept="image/*">
                        </div>
                    </div>
                </div>
                <div class="pro_right">
                    <span class="user_title">회원</span>
                    <span class="user_name">홍길동</span>
                    <span class="user_email">이메일 : bodytrue@bodytrue.com</span>
                    <span class="user_phnumber">휴대전화번호 : 010-1111-1111</span>
                    <div class="user_update">                        
                        <button class="update" type="button">정보수정</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="section2">
            <div class="mp_list">
                <ul class="mptag_list">
                    <li class="mpitem"><a href="#">나의 예약</a></li>
                    <li class="mpitem"><a href="#">/</a></li>
                    <li class="mpitem"><a href="#">나의 리뷰</a></li>
                    <li class="mpitem"><a href="#">/</a></li>
                    <li class="mpitem"><a href="#">즐겨찾기</a></li>
                </ul>
            </div>
        </div>
        <div class="section3">
            <div class="calendar_list">
                <p class="cal_user">나의 예약 리스트</p>
            </div>
            <div class="calendar_table">
                <table class="table_list">
                    <thead>
                        <tr>
                            <th>프로그램</th>
                            <th>트레이너</th>
                            <th>예약시간</th>
                            <th>예약시간 변경</th>
                            <th>리뷰작성</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 1</td>
                            <td>2024-06-18 09:00</td>
                            <td></td>
                            <td><button class="re_btn">리뷰작성하기</button></td>
                        </tr>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 1</td>
                            <td>2024-06-18 11:00</td>
                            <td></td>
                            <td><button class="re_btn">리뷰작성하기</button></td>
                        </tr>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 2</td>
                            <td>2024-06-20 09:00</td>
                            <td><button class="cal_btn">변경</button></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 2</td>
                            <td>2024-06-22 09:00</td>
                            <td><button class="cal_btn">변경</button></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 2</td>
                            <td>2024-06-25 09:00</td>
                            <td><button class="cal_btn">변경</button></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="list_number">
                <ul class="number_box">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>
        </div>
        <div class="section4">
            <div class="review_list">
                <p class="review_user">나의 리뷰 리스트</p>
            </div>
            <div class="review_table">
                <table class="table_list">
                    <thead>
                        <tr>
                            <th>프로그램</th>
                            <th>트레이너</th>
                            <th>예약시간</th>
                            <th>평점</th>
                            <th>리뷰수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 1</td>
                            <td>2024-06-18 09:00</td>
                            <td>5.0</td>
                            <td>
                                <button class="reupdate_btn">수정</button>
                                <button class="reupdate_btn">취소</button>
                            </td>
                        </tr>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 1</td>
                            <td>2024-06-18 11:00</td>
                            <td>4.0</td>
                            <td>
                                <button class="reupdate_btn">수정</button>
                                <button class="reupdate_btn">취소</button>
                            </td>
                        </tr>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 2</td>
                            <td>2024-06-20 09:00</td>
                            <td>1.0</td>
                            <td>
                                <button class="reupdate_btn">수정</button>
                                <button class="reupdate_btn">취소</button>
                            </td>
                        </tr>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 2</td>
                            <td>2024-06-22 09:00</td>
                            <td>2.0</td>
                            <td>
                                <button class="reupdate_btn">수정</button>
                                <button class="reupdate_btn">취소</button>
                            </td>
                        </tr>
                        <tr>
                            <td>프로그램 1</td>
                            <td>트레이너 2</td>
                            <td>2024-06-25 09:00</td>
                            <td>3.0</td>
                            <td>
                                <button class="reupdate_btn">수정</button>
                                <button class="reupdate_btn">취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="list_number">
                <ul class="number_box">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>
        </div>
        <div class="section5">
            <div class="plike_list">
                <p class="plike_user">즐겨찾기 리스트</p>
            </div>
            <div class="plike_table">
                <div class="section5_list">
                    <div class="plike_left">
                        <img src="../image/running.png" alt="">
                    </div>
                    <div class="plike_right">
                        <ul class="table_list">
                            <li class="plike_proname">프로그램 1 <img src="../image/free-icon-star-8539511.png" alt="">&nbsp;<span>4.8</span></li>
                            <li class="plike_trainer">트레이너1</li>
                            <li class="pro_startdate">시작일 : 2024-05-01</li>
                            <li class="pro_enddate">마감일 : 2024-06-30</li>
                        </ul>
                        <div class="del_btn">
                            <button class="plike_delete">삭제</button>
                        </div>
                    </div>
                </div>
                <div class="section5_list">
                    <div class="plike_left">
                        <img src="../image/running.png" alt="">
                    </div>
                    <div class="plike_right">
                        <ul class="table_list">
                            <li class="plike_proname">프로그램 1 <img src="../image/free-icon-star-8539511.png" alt="">&nbsp;<span>4.8</span></li>
                            <li class="plike_trainer">트레이너1</li>
                            <li class="pro_startdate">시작일 : 2024-05-01</li>
                            <li class="pro_enddate">마감일 : 2024-06-30</li>
                        </ul>
                        <div class="del_btn">
                            <button class="plike_delete">삭제</button>
                        </div>
                    </div>
                </div>
                <div class="section5_list">
                    <div class="plike_left">
                        <img src="../image/running.png" alt="">
                    </div>
                    <div class="plike_right">
                        <ul class="table_list">
                            <li class="plike_proname">프로그램 1 <img src="../image/free-icon-star-8539511.png" alt="">&nbsp;<span>4.8</span></li>
                            <li class="plike_trainer">트레이너1</li>
                            <li class="pro_startdate">시작일 : 2024-05-01</li>
                            <li class="pro_enddate">마감일 : 2024-06-30</li>
                        </ul>
                        <div class="del_btn">
                            <button class="plike_delete">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return{
            user_no : this.$router.params.user_no
        };
    },

    created(){
        this.$store.commit('user', { user_email: 'aaa@naver' , user_no: 1 });
        console.log("store",this.$store.state.user);
    },

    computed: {
      user(){
        return this.$store.state.user;
        },
    },

    methods: {
        async userinfo(){
            try{
                if(!this.user_no){
                    alert('로그인 하세용');
                    this.$router.push({ path: '/login' });
                    return;
                }
                const response = await axios.post(`http://localhost:3000/user/mypage/${user_no}`);
                    this.user_no = response.data[0];

            }catch (error){
                console.error('에러발생',error);
            }
        }
        
    }
}

    // // 이미지 사이즈 규격 설정 해야함
    // const imageUpload = document.getElementById('image-upload');
    // const profilePicture = document.getElementById('profile-picture');

    // imageUpload.addEventListener('change', (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             profilePicture.src = e.target.result;
    //         }
    //         reader.readAsDataURL(file);
    //     }
    // });

</script>

<style scoped>
/* mypage */
.mypage_main{
    width: 80%;
    margin: 0 auto;
    /* background-color: gray; */
}

/* section1 = user */
.mypage_main .section1{
    width: 100%;
    height: 300px;
    /* background-color: aqua; */
    border-bottom: 1px solid black;
}
.section1 .profile{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
}
.section1 .pro_left{
    width: 20%;
    height: 100%;
    padding-top: 30px;
    padding-left: 50px;
}
.section1 .pro_left img{
    width: 60%;
}
.section1 .pro_left .upload_img{
    width: 70%;
    height: 10%;
}
.section1 .pro_left .upload{
    padding-top: 5px;
}
.section1 .upload_img .upload_btn{
    /* width: 85%; */
    width: 150px;
    height: 40px;
    font-size: 20px;
    margin: 0 auto;
    cursor: pointer;
}
.section1 .pro_right{
    width: 70%;
    height: 100%;
    padding-top: 30px;
    display: grid;
}
.pro_right .user_title{
    font-size: 35px;
    font-weight: bold;
}
.pro_right .user_name, .user_email, .user_phnumber{
    padding-top: 5px;
    font-size: 20px;
}
.pro_right .user_update{
    padding-top: 5px;
}
.pro_right .update{
    width: 120px;
    height: 30px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
}

/* section2 = tag list */
.mypage_main .section2{
    width: 100%;
    height: 50px;
    /* border-bottom: 1px solid gray; */
}
.section2 .mp_list{
    width: 25%;
    padding-top: 15px;
    padding-right: 50px;
    float: right;
}
.section2 .mp_list .mptag_list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.mptag_list .mpitem{
    font-size: 18px;
}

/* section3 = calendar list */
.mypage_main .section3{
    width: 100%;
    height: 400px;
    border-bottom: 1px solid black;
}
.section3 .calendar_list{
    width: 90%;
    margin: 0 auto;
}
.calendar_list .cal_user{
    font-size: 32px;
}
.section3 .calendar_table{
    width: 100%;
    margin: 0 auto;    
    padding-top: 10px;
}
.calendar_table .table_list{
    width: 90%;
    margin: 0 auto;
    text-align: center;
    border-collapse: collapse;
}
.table_list th,td{
    border: 1px solid black;
    padding: 10px;
}
.table_list th{
    background-color: rgb(218, 218, 218);
}
.table_list .re_btn{
    font-size: 16px;
    width: 120px;
}
.table_list .cal_btn{
    font-size: 16px;
    width: 80px;
}

/* section3, section4 공통 */
.list_number{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top: 10px;
}
.list_number .number_box{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 100px;
    margin: 0 auto;
}
.number_box li{
    width: 20px;
}
.number_box li:nth-child(1){
    background-color: aquamarine;
    border-radius: 5px;
    /* color: white; */
}

/* section4 = review */
.mypage_main .section4{
    width: 100%;
    height: 400px;
    border-bottom: 1px solid black;
}
.section4 .review_list{
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}
.review_list .review_user{
    font-size: 32px;
}
.section4 .review_table{
    width: 100%;
    margin: 0 auto;    
    padding-top: 10px;
}
.review_table .table_list{
    width: 90%;
    margin: 0 auto;
    text-align: center;
    border-collapse: collapse;
}
.table_list th,td{
    border: 1px solid black;
    padding: 10px;
}
.table_list th{
    background-color: rgb(218, 218, 218);
}
.table_list .reupdate_btn{
    font-size: 16px;
    width: 60px;
}

/* section5 = plike */
.mypage_main .section5{
    width: 100%;
    height: 760px;
    border-bottom: 1px solid black;
}
.section5 .plike_list{
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}
.plike_list .plike_user{
    font-size: 32px;
}
.section5 .plike_table{
    width: 90%;
    margin: 0 auto;    
    padding-top: 5px;
}
.plike_table .section5_list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
}
.section5_list .plike_left{
    width: 25%;
}
.section5_list .plike_left img{
    width: 200px;
}
.section5_list .plike_right{
    width: 70%;
}
.plike_right .table_list{
    width: 100%;
    height: 84%;
}
.table_list .plike_proname{
    font-size: 32px;
}
.table_list .plike_proname img{
    width: 20px;
    line-height: 20px;
}
.table_list .plike_proname span{
    font-size: 15px;
    line-height: 40px;
}
.table_list .plike_trainer{
    font-size: 22px;
}
.table_list .pro_startdate, .pro_enddate{
    font-size: 18px;
    padding-top: 10px;
}
.plike_right .del_btn{
    width: 100px;
    height: 50px;
}
.plike_right .del_btn .plike_delete{
    font-size: 18px;
    width: 80px;
    border: 0;
    cursor: pointer;
}</style>