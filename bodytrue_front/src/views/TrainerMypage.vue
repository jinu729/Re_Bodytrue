<template>
    <html>
    <body>
         <div class="mypage_main">
                <div class="section1">
                    <div class="profile">
                        <div class="pro_left">                   
                            <div class="upload_img">
                                <div class="img-box">
                                    <img id="profile-picture" class="profile-picture" :src="trData.img_path ? require(`../../../bodytrue_back/uploads/program/${trData.img_path}`) : '/goodsempty2.jpg'" alt="Profile Picture">
                                </div>
                                <input type="file" id="image-upload" accept="image/*">
                                <label for="image-upload" class="file-upload-label" style="font-size: 16px;"></label><br>   
                                <span style="font-size: 13px;">사이즈(256 * 256)이내</span>
                            </div>
                        </div>
                        <div class="pro_right">
                            <span class="user_title">트레이너</span>
                            <span class="user_name">이름 :{{trData.tr_name}}</span>
                            <span class="user_email">이메일 :{{trData.tr_email}}</span>
                            <span class="user_phnumber">휴대전화번호 : {{ trData.tr_tel }}</span>
                            <div class="user_update">                        
                                <button class="update" type="button">정보수정</button>
                                <button class="create_prc" type="button">프로그램 등록</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section2">
                    <div class="mp_list">
                        <ul class="mptag_list">
                            <li class="mpitem"><a href="#section3">내 프로그램</a></li>
                            <li class="mpitem"><a href="#">/</a></li>
                            <li class="mpitem"><a href="#section4">프로그램 예약</a></li>
                            <li class="mpitem"><a href="#">/</a></li>
                            <li class="mpitem"><a href="#section5">프로그램 리뷰</a></li>
                        </ul>
                    </div>
                </div>
                <div class="section3" id="section3">
                    <div class="mpro_list">
                        <p class="mpro_user">내 프로그램</p>
                    </div>
                    <div class="mpro_table">
                        <table class="table_list">
                            <thead>
                                <tr>
                                    <th>프로그램 명</th>
                                    <th>태그</th>
                                    <th>프로그램 운영 기간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="pro in pagingData" :key="pro.pro_name">
                                    <td>{{pro.pro_name}}</td>
                                    <td>{{pro.pro_tag }}</td>
                                    <td>{{pro.pro_startdate}} - {{ pro.pro_enddate }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--내 프로그램 리스트 페이징-->
                    <div class="pagination">
                        <ul class="number_box">
                            <li @click="prevPageGroup" :class="{disabled: currentPageGroup === 1}"><img src="../image/prev.png"/></li>
                            <li v-for="page in currentGroupPages" :key="page" @click="changePage(page)" :class="{active: page === currentPage}">
                            {{ page }}</li>
                            <li @click="nextPageGroup" :class="{disabled: currentPageGroup === pageGroups.length}"><img src="../image/next.png"/></li>
                        </ul>
                    </div>
                </div>
                <div class="section4" id="section4">
                    <div class="cal_list">
                        <p class="cal_user">프로그램 예약</p>
                    </div>
                    <div class="cal_table">
                        <table class="table_list">
                            <thead>
                                <tr>
                                    <th>프로그램 명</th>
                                    <th>예약 회원</th>
                                    <th>예약시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>김숭메 선생님의 잃어버린키 5센치를 찾아주는 기적의손길</td>
                                    <td>김유연</td>
                                    <td>2024-06-18 09:00</td>
                                </tr>
                                <tr>
                                    <td>민승호선생님의 뼈와 살을 분리해주마 다이어트코스</td>
                                    <td>이광호</td>
                                    <td>2024-06-18 11:00</td>
                                </tr>
                                <tr>
                                    <td>민승호선생님의 뼈와 살을 분리해주마 다이어트코스</td>
                                    <td>문승혁</td>
                                    <td>2024-06-20 09:00</td>
                                </tr>
                                <tr>
                                    <td>SNS에서 대회 입상사진만 보던 내가 이제는 보디빌딩 챔피언?!</td>
                                    <td>박진혁</td>
                                    <td>2024-06-22 09:00</td>
                                </tr>
                                <tr>
                                    <td>김숭메의 요가타임</td>
                                    <td>밍숭맹숭</td>
                                    <td>2024-06-25 09:00</td>
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
                <div class="section5" id="section5">
                    <div class="prore_list">
                        <p class="prore_user">프로그램 리뷰</p>
                    </div>
                    <div class="prore_table">
                        <div class="section5_list">
                            <div class="prore_left">
                                <div class="prore_leftop">
                                    <ul class="table_list">
                                        <li class="prore_proname"><img src="../image/free-icon-star-8539511.png" alt="">&nbsp;<span>4.8</span></li>
                                        <li class="prore_content"><textarea name="content" id="review_content" disabled style="width: 720px; height: 100px; resize: none; background-color: white; font-size: 16px; color: black; padding: 10px;border: 0;">선생님이 너무 착해요</textarea></li>
                                        <li class="prore_reviewdate">작성일 : 2024-06-20</li>
                                    </ul>
                                </div>
                                <div class="prore_leftbottom">
                                    <img src="../image/running.png" alt="">
                                    <img src="../image/running.png" alt="">
                                    <img src="../image/running.png" alt="">
                                </div>
                            </div>
                            <div class="prore_right">
                                <ul class="text_list">
                                    <li class="protext_writeuser">작성자</li>
                                    <li class="protext_username">[문**]</li>
                                    <li class="protext_proname">프로그램 명 </li>
                                    <li class="protext_proname">[민승호선생님의 뼈와 살을 분리해주마 다이어트코스]</li>
                                </ul>
                            </div>
                        </div>
                        <div class="section5_list">
                            <div class="prore_left">
                                <div class="prore_leftop">
                                    <ul class="table_list">
                                        <li class="prore_proname"><img src="../image/free-icon-star-8539511.png" alt="">&nbsp;<span>4.8</span></li>
                                        <li class="prore_content"><textarea name="content" id="review_content" disabled style="width: 720px; height: 100px; resize: none; background-color: white; font-size: 16px; color: black; padding: 10px;border: 0;">잃어 버렸던 키를 찾은 느낌이에요</textarea></li>
                                        <li class="prore_reviewdate">작성일 : 2024-06-20</li>
                                    </ul>
                                </div>
                                <div class="prore_leftbottom">
                                    <img src="../image/running.png" alt="">
                                    <img src="../image/running.png" alt="">
                                    <img src="../image/running.png" alt="">
                                </div>
                            </div>
                            <div class="prore_right">
                                <ul class="text_list">
                                    <li class="protext_writeuser">작성자</li>
                                    <li class="protext_username">[김**]</li>
                                    <li class="protext_proname">프로그램 명 </li>
                                    <li class="protext_proname">[김숭메 선생님의 잃어버린키 5센치를 찾아주는 기적의손길]</li>
                                </ul>
                            </div>
                        </div>
                        <div class="section5_list content" id="moreContent" style="display: flex;">
                            <div class="prore_left">
                                <div class="prore_leftop">
                                    <ul class="table_list">
                                        <li class="prore_proname"><img src="../image/free-icon-star-8539511.png" alt="">&nbsp;<span>4.8</span></li>
                                        <li class="prore_content"><textarea name="content" id="review_content" disabled style="width: 720px; height: 100px; resize: none; background-color: white; font-size: 16px; color: black; padding: 10px;border: 0;">잃어 버렸던 키를 찾은 느낌이에요</textarea></li>
                                        <li class="prore_reviewdate">작성일 : 2024-06-20</li>
                                    </ul>
                                </div>
                                <div class="prore_leftbottom">
                                    <img src="../image/mainpage/main1.jpg" alt="">
                                    <img src="../image/running.png" alt="">
                                    <img src="../image/running.png" alt="">
                                </div>
                            </div>
                            <div class="prore_right">
                                <ul class="text_list">
                                    <li class="protext_writeuser">작성자</li>
                                    <li class="protext_username">[박**]</li>
                                    <li class="protext_proname">프로그램 명 </li>
                                    <li class="protext_proname">[SNS에서 대회 입상사진만 보던 내가 이제는 보디빌딩 챔피언?!]</li>
                                </ul>
                            </div>
                        </div>
                    <div class="addview">
                        <button class="addview_btn" type="button" onclick="toggleContent()">더보기</button>
                    </div>
                </div>
                </div>
            </div>
    </body>
</html>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            trData:{},
            tr_no: this.$route.params.tr_no,
            myPro:[],

            //페이징용
            currentPage: 1,
            itemsPerPage: 5,

            currentPageGroup:1 //프로그램 리스트 페이지 그룹 
        }
    },

    computed:{
        trainer(){
            return this.$store.state.trainer;
        },
        //프로그램 리스트 페이지 계산
        pagingData(){
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.myPro.slice(start, end);
        },
        totalPages(){
            return Math.ceil(this.myPro.length / this.itemsPerPage);
        },
        pageGroups() {
            const groups = [];
            for (let i = 1; i <= this.totalPages; i += 5) {
                groups.push({
                start: i,
                end: Math.min(i + 4, this.totalPages),
                    });
                }
                return groups;
        },
        currentGroupPages() {
            const group = this.pageGroups[this.currentPageGroup - 1];
            if (group) {
                return Array.from({ length: group.end - group.start + 1 }, (_, i) => group.start + i);
                }
                return [];
        },
    },

    created(){
        this.trinfo();
        this.prolist();

    },

    methods:{
        //트레이너 정보 확인
        async trinfo(){
            const tr_no = this.$route.params.tr_no;
            console.log("tr_no", tr_no);
            axios.post(`http://localhost:3000/trainer/trmypage/${tr_no}`)
            .then(response => {
                this.trData = response.data[0];
                console.log("trData",this.trData);
            })
            .catch(error => {
                console.error("트레이너 마이페이지 에러 발생",error);
            })
        },
        //내 프로그램 리스트 확인
        async prolist(){
            const tr_no = this.$route.params.tr_no;
            try{
                const res = await axios.post(`http://localhost:3000/trainer/trprolist`,{tr_no: tr_no});
                const data = res.data;
                this.myPro = data;
                console.log("myPro",this.myPro);
            } catch(error){
                console.error('프로그램 리스트 에러 발생',error);
            }
        },

        //페이징
            changePage(page){
                if(page > 0 && page <= this.totalPages){
                    this.currentPage = page;
                }
            },
            prevPage() {
            if (this.currentPage > 1) {
                this.changePage(this.currentPage - 1);
                }
            },
            nextPage() {
            if (this.currentPage < this.totalPages) {
                this.changePage(this.currentPage + 1);
                }
            },
            nextPageGroup() {
            if (this.currentPageGroup < this.pageGroups.length) {
                this.currentPageGroup++;
                this.changePage(this.pageGroups[this.currentPageGroup - 1].start);
                }
            },
            prevPageGroup() {
            if (this.currentPageGroup > 1) {
                this.currentPageGroup--;
                this.changePage(this.pageGroups[this.currentPageGroup - 1].start);
                }
            },

    },
    
}
</script>
<style scoped>
.mypage_main{
    width: 80%;
    /* height: 100%; */
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
    /* height: 100%; */
    padding-top: 30px;
    padding-left: 50px;
}
.pro_left .upload_img{
    width: 100%;
}
/* .pro_left .upload_img span{
    padding-left: 40px;
} */
.pro_left .upload_img .img-box{
    width: 200px;
    height: 200px;
    border: 2px solid #ccc;
    overflow: hidden;
    display: inline-block;
    position: relative;    
}
.pro_left .upload_img .profile-picture{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

#image-upload{
    padding-top: 5px;
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
    padding-top: 25px;
}
.pro_right .update, .create_prc{
    width: 140px;
    height: 35px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #00C7AE ;
    color: white;
    margin-right: 10px;
}

/* section2 = tag list */
.mypage_main .section2{
    width: 100%;
    height: 50px;
    /* border-bottom: 1px solid gray; */
}
.section2 .mp_list{
    width: 30%;
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
.section3 .mpro_list{
    width: 90%;
    margin: 0 auto;
}
.mpro_list .mpro_user{
    font-size: 32px;
}
.section3 .mpro_table{
    width: 100%;
    margin: 0 auto;    
    padding-top: 10px;
}
.mpro_table .table_list{
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
        width: 150px;
        margin: 0 auto;
    }
    .number_box li{
        width: 20px;
    }
    .number_box li.active{
        background-color: #00c8c8;
        border-radius: 5px;
        /* color: white; */
    }
    .number_box img{
        width:15px;
    }

/* section4 = review */
.mypage_main .section4{
    width: 100%;
    height: 400px;
    border-bottom: 1px solid black;
}
.section4 .cal_list{
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}
.cal_list .cal_user{
    font-size: 32px;
}
.section4 .cal_table{
    width: 100%;
    margin: 0 auto;    
    padding-top: 10px;
}
.cal_table .table_list{
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


/* section5 = plike */
.mypage_main .section5{
    width: 100%;
    border-bottom: 1px solid black;
}
.section5 .prore_list{
    width: 90%;
    margin: 0 auto;
    padding-top: 10px;
}
.prore_list .prore_user{
    font-size: 32px;
}
.section5 .prore_table{
    width: 90%;
    margin: 0 auto;    
    padding-top: 5px;
}
.prore_table .section5_list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 20px;
}
.section5_list .prore_left{
    width: 65%;
    border-right:1px solid #ccc;
}
.prore_left .prore_leftop{
    height: 200px;
}
.table_list .prore_proname img{
    width: 20px;
    line-height: 20px;
}
.table_list .prore_proname span{
    font-size: 15px;
    line-height: 40px;
}
.table_list .prore_content{
    font-size: 22px;
}
.table_list .prore_reviewdate{
    font-size: 16px;
    padding-top: 90px;
}

.prore_left .prore_leftbottom{
    width: 740px;
    display: flex;
    justify-content: space-between;
}
.prore_left .prore_leftbottom img{
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
}

.section5_list .prore_right{
    width: 34%;
}
.prore_right .text_list{
    padding: 20px;
    font-size: 14px;
}
.text_list li{
    padding-top: 10px;
}
.section5_list .content {
    display: none; /* 기본적으로 내용 숨기기 */
    margin-top: 20px;
}
.section5 .addview{
    width: 100%;
    height: 80px;
    margin-top: 50px;
    text-align: center;
}
.addview .addview_btn{
    width: 120px;
    height: 40px;
    font-size: 18px;
    border-radius: 5px;
    border: 0;
    background-color: #00C7AE;
    color: white;
    cursor: pointer;
}
.addview .addview_btn:hover{
    background-color: #0056b3;
}

</style>