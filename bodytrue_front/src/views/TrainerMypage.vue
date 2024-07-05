<template>
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
                                    <td>{{getTag(pro.pro_tag)}}</td>
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
                                <tr v-for="cal in cpagingData" :key="cal.cal_startdate">
                                    <td>{{cal.pro_name}}</td>
                                    <td>{{cal.user_name}}</td>
                                    <td>{{cal.cal_startdate}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--내 예약리스트 페이징-->
                    <div class="pagination">
                        <div class="list_number">
                            <ul class="number_box">
                                <li @click="cprevPageGroup" :class="{disabled: cCurrentPageGroup === 1}"><img src="../image/prev.png"/></li>
                                <li v-for="page in cCurrentGroupPage" :key="page" @click="cchangePage(page)" :class="{active: page === cCurrentPage}">
                                    {{page}}</li>
                                <li @click="cnextPageGroup" :class="{disabled: cCurrentPageGroup === cpageGroups.length}"><img src="../image/next.png"/></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="section5" id="section5">
                    <div class="prore_list">
                        <p class="prore_user">프로그램 리뷰</p>
                    </div>
                    <div class="prore_table">
                        <div v-for="review in myRe" :key="review.re_no" class="section5_list">
                            <div class="prore_left">
                                <div class="prore_leftop">
                                    <ul class="table_list">
                                        <li class="prore_proname"><img src="../image/free-icon-star-8539511.png" alt="">&nbsp;<span>{{review.re_rate}}</span></li>
                                        <li class="prore_content">
                                            <textarea v-model="review.re_comment" name="content" id="review_content" disabled style="width: 720px; height: 100px; resize: none; background-color: white; font-size: 16px; color: black; padding: 10px;border: 0;"></textarea></li>
                                        <li class="prore_reviewdate">작성일 : {{review.re_date}}</li>
                                    </ul>
                                </div>
                                <div class="prore_leftbottom">
                                    <img v-if="review.img_path" :src="review.img_path ? require(`../../../bodytrue_back/uploads/program/${review.img_path}`) : '/goodsempty2.jpg'" >
                                </div>
                            </div>
                            <div class="prore_right">
                                <ul class="text_list">
                                    <li class="protext_writeuser">작성자</li>
                                    <li class="protext_username">[{{ naming(review.user_name) }}]</li>
                                    <li class="protext_proname">프로그램 명 </li>
                                    <li class="protext_proname">[{{review.pro_name}}]</li>
                                </ul>
                            </div>
                        </div>
                        <!-- <div class="section5_list content" id="moreContent" style="display: flex;">
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
                        </div> -->
                    <div class="addview">
                        <button class="addview_btn" type="button" onclick="toggleContent()">더보기</button>
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
            trData:{},
            tr_no: this.$route.params.tr_no,
            myPro:[],
            myCal:[],
            myRe:[],

            //페이징용
            currentPage: 1,
            itemsPerPage: 5,
            
            cCurrentPage: 1,
            citemsPerPage: 5,

            currentPageGroup:1, //프로그램 리스트 페이지 그룹 
            cCurrentPageGroup:1 //예약 리스트 페이지 그룹
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
        //예약 리스트 페이지 계산
        cpagingData(){
                const start = (this.cCurrentPage -1 ) * this.citemsPerPage;
                const end = start + this.citemsPerPage;
                return this.myCal.slice(start,end);
        },
        ctotalPages(){
            return Math.ceil(this.myCal.length / this.citemsPerPage);
        },
        cpageGroups(){
            const groups=[];
            for(let i = 1; i<= this.ctotalPages; i+=5){
                groups.push({
                    start:i,
                    end: Math.min(i + 4, this.ctotalPages),
                });
            }
            return groups;
        },
        cCurrentGroupPage(){
            const group = this.cpageGroups[this.cCurrentPageGroup - 1];
            if(group){
                return Array.from({ length: group.end - group.start + 1}, (_,i) => group.start + i); 
            }
            return [];
        }

    },

    created(){
        this.trinfo();
        this.prolist();
        this.callist();
        this.relist();
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
        //태그 네이밍 붙히기
        getTag(pro_tag){
            const tagmapping ={
                0: '다이어트',
                1: '체형교정',
                2: '대회',
                3: '체력증진',
                4: '홈트'
            };
            return tagmapping[pro_tag];
        },
        //내 예약 리스트 확인
        async callist(){
            const tr_no = this.$route.params.tr_no;
            try{
                const res = await axios.post(`http://localhost:3000/trainer/trcallist`,{tr_no: tr_no});
                const data = res.data;
                this.myCal = data;
                console.log("myCal", this.myCal);
            }catch(error){
                console.error('예약 리스트 에러 발생', error);
            }
        },
        //내 리뷰 리스트 확인
        async relist(){
            const tr_no = this.$route.params.tr_no;
            try{
                const res = await axios.post(`http://localhost:3000/trainer/trrelist`, {tr_no : tr_no});
                const data = res.data;
                this.myRe = data;
                console.log("myRe", this.myRe);
            } catch(error){
                console.error('리뷰 리스트 에러 발생', error);
            }
        },
        // 리뷰에 이름 ** 채워넣기
        naming(username){
            if(!username){
                return '';
            }
            const making = username.slice(0,1) + '**';
            return making;
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
            cchangePage(page){
                if(page > 0 && page <= this.ctotalPages){
                    this.cCurrentPage = page;
                }
            },
            prevCPage(){
                if(this.cCurrentPage > 1){
                    this.cchangePage(this.cCurrentPage - 1);
                }
            },
            nextCPage(){
                if(this.cCurrentPage < this.ctotalPages){
                    this.cchangePage(this.cCurrentPage + 1);
                }
            },
            cnextPageGroup(){
                if(this.cCurrentPageGroup < this.cpageGroups.length){
                    this.cCurrentPageGroup++;
                    this.cchangePage(this.cpageGroups[this.cCurrentPageGroup - 1].start);
                }
            },
            cprevPageGroup(){
                if(this.cCurrentPageGroup > 1){
                    this.cCurrentPageGroup--;
                    this.cchangePage(this.cpageGroups[this.cCurrentPageGroup -1].start);
                }
            }

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
        padding-top:5px;
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
}

.prore_left .prore_leftbottom{
    width: 740px;
    display: flex;
    justify-content: space-between;
    padding-top: 
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