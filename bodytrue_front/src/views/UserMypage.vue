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
                    <span class="user_name">{{userData.user_name}}</span>
                    <span class="user_email">{{userData.user_email}}</span>
                    <span class="user_phnumber">{{userData.user_tel}}</span>
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
                        <!--고유한 키값 설정해줘야해서 cal_startdate 키값으로 냅둠ㅇㅇ cal.pro_name은 중복값이 많으므로 탈락-->
                        <tr v-for="cal in pagingData" :key="cal.cal_startdate">
                            <td>{{ cal.pro_name }}</td>
                            <td>{{ cal.tr_name }}</td>
                            <td>{{ cal.cal_startdate }}</td>
                            <td></td>
                            <td><button class="re_btn">리뷰작성하기</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--예약리스트 페이징-->
            <div class="pagination">
                <ul class="number_box">
                    <li name="number_box" v-for="page in totalPages" :key="page" 
                    @click="changePage(page)" :class="{active: page === currentPage }">
                    {{ page }}
                    </li>
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
                        <tr v-for="re in reData" :key="re.cal_startdate">
                            <td>{{ re.pro_name }}</td>
                            <td>{{ re.tr_name }}</td>
                            <td>{{ re.cal_startdate }}</td>
                            <td>{{ re.re_rate || '리뷰작성안함'}}</td>
                            <td>
                                <button class="reupdate_btn">수정</button>
                                <button class="reupdate_btn">취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <ul class="number_box">
                    <li name="number_box" v-for="repage in retotalPages" :key="repage"
                    @click="rechangePage(page)" :class="{active: repage === recurrentPage }">
                    {{ repage }}
                    </li>
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

export default {
    data(){
        return{
            userData: {
                user_name: '',
                user_email: '',
                user_tel: ''
            },
            calData: [],
            reData:[],
            plikeData:[],
            currentPage: 1,
            itemsPerPage: 5,
            recurrentPage: 1,
            reitemsPerPage: 5
        };
    },

    created(){
        //내정보 불러오는 methods 생성
        this.myinfo();
        this.mycalcheck();
        this.myrecheck();
        this.myplike();
        // this.$store.commit('user', { user_email: 'aaa@naver' , user_no: 1 });
        // const user_no = this.$route.params.user_no;
        // axios.post(`http://localhost:3000/user/mypage/${user_no}`)
        //     .then(response =>{
        //         this.userData = response.data[0];
        //     })
        //     .catch(error => {
        //         console.error("마이페이지 에러발생",error);
        //     })
    },

    computed:{
        user_no(){
            return this.$store.state.user.user_no;
        },
        user_email(){
            return this.$store.state.user.user_email;
        },
        //예약 현재 페이지 계산
        pagingData(){
            const start = (this.currentPage -1 )* this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.calData.slice(start, end);
        },
        totalPages(){
            return Math.ceil(this.calData.length / this.itemsPerPage);
        },
        //리뷰 현재 페이지 계산
        repagingData(){
            const start = (this.recurrentPage -1 )* this.reitemsPerPage;
            const end = start + this.reitemsPerPage;
            return this.reData.slice(start,end);
        },
        retotalPages(){
            return Math.ceil(this.reData.length / this.reitemsPerPage);
        }
    },
    methods:{
        //내 정보 확인
        async myinfo(){
            const user_no = this.$route.params.user_no;
            axios.post(`http://localhost:3000/user/mypage/${user_no}`)
            .then(response => {
                this.userData = response.data[0];
            })
            .catch(error => {
                console.error("마이페이지 에러 발생", error);
            })
        },
        //내 예약 확인
        async mycalcheck(){
            const user_no = this.$route.params.user_no;
            try{
                const response = await axios.post(`http://localhost:3000/user/mycalcheck`,{user_no:user_no});
                const data = response.data
                this.calData = data;
                console.log("calData",this.calData);
            } catch(error){
                console.error('예약 정보 불러오는 중 오류 발생', error);
            }
        },
        //내 리뷰 확인
        async myrecheck(){
            const user_no = this.$route.params.user_no;
            try{
                const response = await axios.post(`http://localhost:3000/user/myrecheck`,{user_no:user_no});
                const data = response.data;
                this.reData = data;
                console.log("reData:", this.reData);
            } catch(error){
                console.error("리뷰정보 불러오는 중 에러 발생", error);
            }
        },
        //내 찜 확인
        async myplike(){
            const user_no= this.$route.params.user_no;
            try{
                const response = await axios.post(`http://localhost:3000/user/myplike`,{user_no:user_no});
                const data = response.data;
                this.plikeData = data;
                console.log("plikeData:", this.plikeData);
            } catch(error){
                console.error("찜 정보 불러오는 중 에러 발생", error);
            }
        },

        //페이징
        changePage(page){
            this.currentPage = page;
        },

        rechangePage(repage){
            this.recurrentPage = repage;
        }

    }

}
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
.pagination{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding-top: 10px;
}
.pagination .number_box{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    width: 100px;
    margin: 0 auto;
}
.number_box li{
    width: 20px;
}
.number_box li.active{
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