<template>
    <div class="mypage_main">
        <div class="section1">
            <div class="profile">
                <div class="pro_left">                   
                    <div class="upload_img">
                        <img id="profile-picture" class="profile-picture" src="../image/user2.png" alt="Profile Picture">
                        <div class="file-input">
                            <input type="file" id="image-upload" accept="image/*" @change="uploadFile($event.target.files, 0)">
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
                    <li class="mpitem"><a href="#mycal">나의 예약</a></li>
                    <li class="mpitem"><a href="#">/</a></li>
                    <li class="mpitem"><a href="#myreview">나의 리뷰</a></li>
                    <li class="mpitem"><a href="#">/</a></li>
                    <li class="mpitem"><a href="#myplike">즐겨찾기</a></li>
                </ul>
            </div>
        </div>
        <div class="section3" id="callist1">
            <div class="calendar_list">
                <p class="cal_user">나의 예약 리스트</p>
            </div>
            <div class="calendar_table">
                <!--예약내역이 있을 경우에만 보여줌 -->
                <table v-if="calData.length > 0" class="table_list">
                    <thead>
                        <tr>
                            <th>프로그램</th>
                            <th>트레이너</th>
                            <th>예약시간</th>
                            <th>예약 취소</th>
                            <th>리뷰작성</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!--고유한 키값 설정해줘야해서 cal_startdate 키값으로 냅둠ㅇㅇ cal.pro_name은 중복값이 많으므로 탈락-->
                        <tr v-for="cal in pagingData" :key="cal.cal_startdate">
                            <!--이름 누를때마다 해당 프로그램으로 이동-->
                            <td @click="goToProdetail(cal.pro_no)">{{ cal.pro_name }}</td>
                            <td>{{ cal.tr_name }}</td>
                            <td>{{ cal.cal_startdate }}</td>
                            <td><button @click="deletecal(cal.pro_no, cal.cal_startdate)" class="cal_btn">예약 취소하기</button></td>
                            <td><button @click="openReviewModal(cal)" class="re_btn" :disabled="!isReviewenabled(cal.cal_startdate)">리뷰작성하기</button></td>
                        </tr>
                    </tbody>
                </table>
                <div v-else> 
                    <table class="table_list">
                    <p style="font-size: 26px;"> 예약 내역이 없습니다. </p>
                    </table>
                </div>
            </div>
            <!--예약리스트 페이징-->
            <div class="pagination">
                <ul class="number_box">
                    <li @click="prevPageGroup" :class="{disabled: currentPageGroup === 1}"><img src="../image/prev.png"/></li>
                    <li v-for="page in currentGroupPages" :key="page" @click="changePage(page)" :class="{active: page === currentPage}">
                    {{ page }}</li>
                    <li @click="nextPageGroup" :class="{disabled: currentPageGroup === pageGroups.length}"><img src="../image/next.png"/></li>
                </ul>
            </div>
        </div>
        <div class="section4" id="myreview">
            <div class="review_list">
                <p class="review_user">나의 리뷰 리스트</p>
            </div>
            <div class="review_table">
                <!--리뷰 내역이 있을 경우에만 보여줌-->
                <table v-if="reData.length > 0" class="table_list">
                    <thead>
                        <tr>
                            <th>프로그램</th>
                            <th>트레이너</th>
                            <th>작성날짜</th>
                            <th>평점</th>
                            <th>리뷰수정/삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="re in repagingData" :key="re.re_no">
                            <td @click="goToProdetail(re.pro_no)">{{ re.pro_name }}</td>
                            <td>{{ re.tr_name }}</td>
                            <td>{{ re.re_date }}</td>
                            <td>{{ re.re_rate}}</td>
                            <td>
                                <button @click="openReviewModal(re)" class="reupdate_btn">수정</button>
                                <button @click="deletere(re.re_no)" class="redelete_btn">삭제</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--리뷰내역이 없을 경우-->
                <div v-else>
                    <table class="table_list">
                        <p style="font-size:26px">리뷰 내역이 없습니다.</p>
                    </table>
                </div>
            </div>
            <!--리뷰 리스트 페이징-->
            <div class="pagination">
                <ul class="number_box">
                    <li @click="prevRePageGroup" :class="{disabled: reCurrentPageGroup === 1}"><img src="../image/prev.png"/></li>
                    <li v-for="page in currentReGroupPages" :key="page" @click="rechangePage(page)" :class="{active: page === recurrentPage}">
                    {{ page }}</li>
                    <li @click="nextRePageGroup" :class="{disabled: reCurrentPageGroup === rePageGroups.length}"><img src="../image/next.png"/></li>
                </ul>
            </div>
        </div>
        <div class="section5" id="myplike">
            <div class="plike_list">
                <p class="plike_user">즐겨찾기 리스트</p>
            </div>
            <div class="plike_table">
                <!--찜내역 있을 경우-->
                <div v-if="plikeData.length > 0">
                    <div class="section5_list">
                        <div class="plike_left">
                            <img src="../image/running.png" alt="">
                        </div>
                        <div class="plike_right">
                            <ul class="table_list">
                                <li v-for="plike in moreplikeData" :key="plike.pro_name">
                                    <div @click="goToProdetail(plike.pro_no)" class="plike_proname">{{ plike.pro_name }} 
                                        <img src="../image/free-icon-star-8539511.png" alt="">&nbsp;<span style="font-size:22px;">{{plike.rate_avg}}</span></div>
                                    <div class="plike_trainer">{{plike.tr_name}}</div>
                                    <div class="pro_startdate">시작일 : {{plike.pro_startdate}}</div>
                                    <div class="pro_enddate">마감일 : {{plike.pro_enddate}}</div>
                                    <div class="del_btn">
                                        <!--찜정보 가져올때 가져온 plike.pro_no으로 찜내역 삭제-->
                                        <button class="plike_delete" @click="delplike(plike.pro_no)">삭제</button>
                                    </div>
                                </li>
                            </ul>
                            <button v-if="plikeData.length > moreplikeCount " @click="showmore" class="showmore_btn">더보기</button>
                        </div>      
                    </div>
                </div>
                <!--찜내역 아무것도 없을 경우-->
                <div class="nolikelist" v-else >
                    <p>찜 내역이 없습니다.</p>
                </div>
            </div>
        </div>
         <ReviewModal :isOpen="isReviewModalOpen" :reviewData="reviewData" 
         @close="closeReviewModal" @review-submitted="handleReviewSubmitted"/>
    </div>
</template>

<script>
import axios from 'axios';
import ReviewModal from '../views/UserReview.vue';

export default {
    components:{
        ReviewModal,
    },
    
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
            //페이징용
            currentPage: 1, //예약
            itemsPerPage: 5,
            recurrentPage: 1, //리뷰
            reitemsPerPage: 5,
            moreplikeCount: 1,//좋아요
            currentPageGroup: 1, // 예약 페이지 그룹
            reCurrentPageGroup: 1, // 리뷰 페이지 그룹
            //모달용
            isReviewModalOpen: false,
            reviewData: {
                pro_no: null,
                pro_name:'',
                re_comment: '',
                re_user_no: null,
                re_tr_no: null,
                re_rate: 0,
                re_no: null
            }
        };
    },
    mounted(){
        console.log("마운트됨");
        this.myrecheck();
        this.mycalcheck();
        this.myImg();

    },

    created(){
        //내정보 불러오는 methods 생성
        this.myinfo();
        this.mycalcheck();
        // this.myrecheck();
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
        user() {
            return this.$store.state.user;    
        },
        // //예약 현재 페이지 계산
        pagingData(){
            const start = (this.currentPage - 1 )* this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.calData.slice(start, end);
        },
        totalPages(){
            return Math.ceil(this.calData.length / this.itemsPerPage);
        },
        // //필터 리뷰데이터값
        // filterRedata(){
        //     return this.reData.filter(item => item.re_rate !== null);
        // },
        //리뷰 현재 페이지 계산
        repagingData(){
            const start = (this.recurrentPage - 1 )* this.reitemsPerPage;
            const end = start + this.reitemsPerPage;
            return this.reData.slice(start,end);
        },
        retotalPages(){
            return Math.ceil(this.reData.length / this.reitemsPerPage);
        },
        moreplikeData(){
            return this.plikeData.slice(0, this.moreplikeCount);
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
        rePageGroups() {
        const groups = [];
        for (let i = 1; i <= this.retotalPages; i += 5) {
            groups.push({
            start: i,
            end: Math.min(i + 4, this.retotalPages),
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
        currentReGroupPages() {
        const group = this.rePageGroups[this.reCurrentPageGroup - 1];
        if (group) {
            return Array.from({ length: group.end - group.start + 1 }, (_, i) => group.start + i);
            }
            return [];
        }
    },

    methods:{
        async uploadFile(file, type) {
            let name = "";
            if (file) {
                name = file[0].name;
                console.log("name", name);
            } else {
                return; // 파일 미선택 시 반환
            }

            const user_no = this.$route.params.user_no;

            const formData = new FormData();

            formData.append('img', file[0]); // 파일 자체를 전송
            formData.append('user_no',user_no);

            console.log(formData);
            this.fileName = file ? file[0].name : '이미지를 업로드 하세요';

            

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            try {
                const res = await axios({
                    url: 'http://localhost:3000/user/upload_Uimg',
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                });

                if (res.data.message == 'success') {
                    if (type == 0) {
                        this.user_img = res.img; // 서버가 반환한 파일명으로 수정
                        console.log("0", this.user_img);
                    }
                } else {
                    this.$swal("DB 에러");
                }
            } catch (e) {
                console.log(e);
            }
        },
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
        async myImg(){
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
                let data = response.data;
                console.log("필터전 데이터값",data);
                //필터메서드 이용해서 re_rate값이 not null 인 경우에만 true, 새로운 배열에 할당
                // data = data.filter(item => item.re_rate !== null);
                // console.log("필터후 데이터값", data);

                // // re_no 값이 고유한지 확인
                // const reNoSet = new Set();
                // data.forEach(item => {
                //     if (reNoSet.has(item.re_no)) {
                //     console.warn("중복된 re_no 발견:", item.re_no);
                //     } else {
                //     reNoSet.add(item.re_no);
                //     }
                // });
                            
                this.reData = data;
                console.log("user_no",user_no);
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
            if(page > 0 && page <= this.totalPages){
                this.currentPage = page;
            }
        },

        rechangePage(repage){
            if(repage > 0 && repage <= this.retotalPages){
                this.recurrentPage = repage;
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
        prevRePage() {
        if (this.recurrentPage > 1) {
            this.rechangePage(this.recurrentPage - 1);
        }
        },
        nextRePage() {
        if (this.recurrentPage < this.retotalPages) {
            this.rechangePage(this.recurrentPage + 1);
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
        nextRePageGroup() {
        if (this.reCurrentPageGroup < this.rePageGroups.length) {
            this.reCurrentPageGroup++;
            this.rechangePage(this.rePageGroups[this.reCurrentPageGroup - 1].start);
        }
        },
        prevRePageGroup() {
        if (this.reCurrentPageGroup > 1) {
            this.reCurrentPageGroup--;
            this.rechangePage(this.rePageGroups[this.reCurrentPageGroup - 1].start);
        }
        },

        //찜 목록 더보기
        showmore(){
            return this.moreplikeCount += 1; //한번에 보여줄 개수 3개
        },
        //찜 목록 삭제
        async delplike(plike_pro_no){ //위에서 delplike클릭 할 때 받은 변수 plike.pro_no의 매개변수 이름이 plike_pro_no
            const plike_user_no = this.$route.params.user_no;
            console.log("plike_user_no", plike_user_no);
            console.log("plike_pro_no",plike_pro_no);
           try{
            const response = await axios.post('http://localhost:3000/user/delmyplike', {
                user_no: plike_user_no,
                pro_no: plike_pro_no
            });
                console.log('찜삭제 성공',response.data);
                alert('찜 목록에서 삭제되었습니다.');
                //삭제된 후 찜 목록 업데이트
                this.plikeData = this.plikeData.filter(plike => plike.pro_no !== plike_pro_no);
                //필터를 통해서 내가 삭제한 프로그램 번호랑 기존에 있는 찜 프로그램 번호 비교해서 true 값만 다시
                //배열에 넣어서 plikeData를 초기화중
            }catch(error){
                console.error('찜삭제 도중 오류 발생', error);
            }
        },
        //상품상세페이지로 이동하기
        goToProdetail(pro_no){
            this.$router.push(`/prodetail/${pro_no}`);
        },
        //리뷰작성하기 위해 모달창 오픈 
        openReviewModal(calOrre){
            console.log("calOrre.tr_no",calOrre.tr_no);
            console.log("calOrre.re_no",calOrre.re_no);

            this.reviewData = {
               re_pro_no: calOrre.pro_no,
               pro_name: calOrre.pro_name,
               re_user_no: this.$route.params.user_no,
               re_tr_no : calOrre.tr_no,
               re_comment: calOrre.re_comment ||'',
               re_rate: calOrre.re_rate || 0,
               re_no: calOrre.re_no || null,
            };
            console.log("reviewData", this.reviewData);
            this.isReviewModalOpen = true;
        },
        closeReviewModal(){
            this.isReviewModalOpen = false;
        },
        handleReviewSubmitted(){
            this.myrecheck(); //작성완료되면 리뷰다시불러옴
        },
        //현재날짜 > 예약날짜 일때만 리뷰버튼 오픈
        isReviewenabled(cal_startdate){
            const currentDate = new Date();

            //지금 cal_startdate가 yy년mm월dd일 H시 이렇게 포맷되어있어서 바꿔줘야됨 
            const dateParts = cal_startdate.match(/(\d{2})년(\d{2})월(\d{2})일 (\d{2})시/);
            if (!dateParts) {
                console.error('데이터포맷오류:', cal_startdate);
                return false; // Default to disabling the button if parsing fails
            }
            //stratdate 데이터포맷 
            const year = 2000 + parseInt(dateParts[1], 10);
            const month = parseInt(dateParts[2], 10) - 1;
            const day = parseInt(dateParts[3], 10);
            const hour = parseInt(dateParts[4], 10);

            const startdate = new Date(year, month, day, hour);
            
            console.log('오늘 날짜:', currentDate);
            console.log('예약 날짜:', startdate);
            // console.log('비교:', currentDate > startdate);
            //오늘 날짜 > 예약날짜 일 경우에만 리뷰버튼 오픈
            return currentDate > startdate;
        },

        //예약 삭제하기
        async deletecal(cal_pro_no, cal_startdate){
            console.log("cal_pro_no",cal_pro_no);
            const cal_user_no = this.$route.params.user_no;
            console.log("cal_user_no",cal_user_no);
            console.log("=============");
            console.log("cal_startdate",cal_startdate);

            //지금 cal_startdate가 yy년mm월dd일 H시 이렇게 포맷되어있어서 바꿔줘야됨 
            // cal_startdate 포맷이 yy년mm월dd일 H시MM분SS초 인 경우
    const dateParts = cal_startdate.match(/(\d{2})년(\d{2})월(\d{2})일 (\d{2})시/);
            if (!dateParts) {
                console.error('데이터포맷오류:', cal_startdate);
                return false; // Default to disabling the button if parsing fails
            }
            //stratdate 데이터포맷 
            const year = 2000 + parseInt(dateParts[1], 10);
            const month = parseInt(dateParts[2], 10) - 1;
            const day = parseInt(dateParts[3], 10);
            const hour = parseInt(dateParts[4], 10);
            // const minute = parseInt(dateParts[5],10);
            // const second = parseInt(dateParts[6],10);

            const formatcal_startdate = new Date(year, month, day, hour);
            console.log("예약한시작",formatcal_startdate);
            

            try{
                const response = await axios.post(`http://localhost:3000/user/deletecal`, {
                pro_no: cal_pro_no,
                user_no: cal_user_no,
                cal_startdate: formatcal_startdate.toISOString()
                });
                console.log("예약 삭제 성공", response.data);
                alert('예약 목록에서 삭제 되었습니다.');

                window.location.reload();
                // this.calData = response.data;
            } catch(error){
                console.error("예약 삭제도중 에러 발생",error);
            }
        },

        //리뷰 삭제하기
        async deletere(re_no){
            console.log("re_no",re_no);
            try{
                const response = await axios.post(`http://localhost:3000/user/deletere`, {re_no: re_no});
                console.log("리뷰 삭제 성공", response.data);
                alert('리뷰 목록에서 삭제 되었습니다.');
            } catch(error){
                console.error("리뷰 삭제 도중 에러 발생",error);
            }
        },
        
        //리뷰 수정하기
        async updatere(re_no){
            const review = this.reData.find(r => r.re_no === re_no);
            this.openReviewModal(review);
        },

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
        width: 150px;
        font-size: 18px;
        border-radius: 5px;
        cursor: pointer;
        border: 0;
        background-color:#3fced3;
        color:white;
        border-radius: 5px;
        border: 1px solid;
        box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
    }
    .pro_right .update:Hover{
        width: 150px;
        font-size: 18px;
        border-radius: 5px;
        cursor: pointer;
        border: 0;
        background-color:#ffffff;
        color:#3fced3;
        border-radius: 5px;
        border: 1px solid;
        box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
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
        height: 25px;
        color:rgb(255, 255, 255);
        border:solid 1px;
        border-radius: 5px;
        background: #ff751f;
    }
    .table_list .re_btn:hover{
        font-size: 16px;
        width: 120px;
        height: 25px;
        color: #ff751f;
        border:solid 1px;
        border-radius: 5px;
        background: rgb(255, 255, 255);
    }
    .table_list .cal_btn{
        font-size: 16px;
        width: 120px;
        height: 25px;
        color:rgb(255, 255, 255);
        border:solid 1px;
        border-radius: 5px;
        background:  #ff2b2b;
    }
    .table_list .cal_btn:hover{
        font-size: 16px;
        width: 120px;
        height: 25px;
        color:#ff2b2b;
        border:solid 1px;
        border-radius: 5px;
        background:  rgb(255, 255, 255);
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
        /* height: 400px; */
        border-bottom: 1px solid black;
        padding-bottom: 10px;
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
        margin: 10px auto;
        border:none;
        color: white;
        background-color: #777777;
        border-radius: 20px;
        cursor: pointer;
    }
    .table_list .reupdate_btn:hover{
        font-size: 16px;
        width: 60px;
        margin: 10px auto;
        border:none;
        color: #777777;
        background-color: rgb(193, 192, 192);
        border-radius: 20px;
        cursor: pointer;
    }
    .table_list .redelete_btn{
        font-size: 16px;
        width: 60px;
        height: 25px;
        color:rgb(255, 255, 255);
        border:solid 1px;
        border-radius: 20px;
        background:  #ff2b2b;
    }
    .table_list .redelete_btn:hover{
        font-size: 16px;
        width: 60px;
        height: 25px;
        color:#ff2b2b;
        border:solid 1px;
        border-radius: 20px;
        background:  rgb(255, 255, 255);
    }
    /* section5 = plike */
    .mypage_main .section5{
        width: 100%;
        height: 760px;
        /* border-bottom: 1px solid black; */
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
        font-size: 16px;
        width: 60px;
        border-radius: 20px;
        margin: 10px auto;
        border:none;
        color: white;
        background-color: #777777;
        cursor: pointer;
    }
    .plike_right .del_btn .plike_delete:hover{
        font-size: 16px;
        width: 60px;
        border-radius: 20px;
        margin: 10px auto;
        border:none;
        color: #777777;
        background-color: rgb(193, 192, 192);
        cursor: pointer;
    }
    .nolikelist{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: 26px;
    }
    .showmore_btn{
        display: block;
        height: 50px;
        margin: 20px auto;
        padding: 10px 20px;
        font-size: 18px;
        background-color: #00c8c8;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .showmore_btn:hover{
        background-color: #009e9e;
    }
    </style>