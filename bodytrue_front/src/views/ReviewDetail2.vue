<template>
    <div class="prc_main">
        <div class="prc_title">
            <p>리뷰 관리</p>
        </div>
            <div class="qwer">
                <div class="prc_date">
                    <span>작성일:&nbsp;</span>
                    <p>{{ review.re_date }}</p>
                </div>
                <div class="prc_name">
                    <span class="prcn_title">프로그램명</span>
                    <div class="prcn_text">
                        <p>{{ review.pro_name }}</p>
                    </div>
                </div>
                <div class="prc_name">
                    <span class="prcn_title">트레이너명</span>
                    <div class="prcn_text">
                        <p>{{ review.tr_name }}</p>
                    </div>
                </div>
                <div class="prc_name">
                    <span class="prcn_title">작성자</span>
                    <div class="prcn_text">
                        <p>{{ review.user_name }}</p>
                    </div>
                </div>

                <div class="font_title">
                    <span>내 용</span>
                </div>
                    <textarea class="naeyong" v-model="review.re_comment" readonly></textarea>
            <div class="button_container">
                <button class="re_back" @click="goBack">뒤로가기</button>
                <button class="re_delete" @click="deletereview(review.re_no)">삭제</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            review: {},
            reviewimg:{},
            error: ''
        };
    },
    methods: {
        getReviewData() {
            const re_no = this.$route.params.re_no;

            axios.get(`http://localhost:3000/admin/review2/${re_no}`)
            .then(response => {
                if (response.data) {
                    this.review = response.data[0];
                    console.log("review :", this.review);

                    console.log("reviewimg :",this.review.images);
                } else {
                    this.error = 'No review data found';
                }
            })
            .catch(error => {
                this.error = 'Error fetching review data: ' + (error.response ? error.response.data.error : error.message);
            });
        },
        deletereview(re_no) {
            console.log('re_no', re_no);
            axios.post('http://localhost:3000/admin/deletereview', { re_no: re_no })
            .then(response => {
                if (response.status == 200) {
                    confirm("삭제하시겠습니까?")
                    // 이전 페이지로 이동
                    this.$router.go(-1);
                } else {
                    this.error = 'Failed to delete review';
                }
            })
            .catch(error => {
                this.error = 'Error deleting review: ' + (error.response ? error.response.data.error : error.message);
            });
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    created(){
        this.getReviewData();
    },
    mounted() {
        this.getReviewData();
    }
}
</script>

<style scoped>
.prc_main {
    /* background-color: #97cfcb; */
    color: #111111;
    /* border: 2px solid #3b4746; */
    width: 80%;
    font-size: 18px;
    text-align: center;
    margin: auto;
    border-collapse: collapse;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
}

.prc_title p {
    background-color: #00C7AE; /* 배경색을 청록색으로 설정 */
    color: #fff; /* 텍스트 색상을 흰색으로 설정 */
    padding: 10px 20px 10px 25px; /* 상하 패딩 10px, 좌우 패딩 20px 설정 */
    font-weight: bold; /* 폰트를 굵게 설정 */
    font-size: 26px; /* 폰트 크기를 24px로 설정 */
    border-radius: 10px 10px 10px 10px; /* 상단 좌우 모서리를 둥글게 설정 */
    text-align: left;
}

.prc_info {
    margin-bottom: 20px;
    
}

.prc_info > div {
    flex: 1;
    margin-right: 10px;
}

.prc_info > div:last-child {
    margin-right: 0;
}

.prcn_title{
    width: 100px;
    height: 30px;
    line-height: 35px;
    text-align: left;
    margin: 5px;
    margin-left: 10px;
}
.prcn_title p {
    text-align: center;
}

.prc_content {
    margin-top: 50px;
    
}

.prc_images {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.prci_image {
    width: 23%;
}

.prci_image img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.error-message {
    color: red;
    font-weight: bold;
    text-align: center;
}

.button_container {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
}

.re_back, .re_delete {
    display: inline-block;
    width: 100px;
    height: 40px;
    margin: 0 10px;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
}

.re_back{
    background-color: #7ED2FF;
}

.re_back:hover {
    background: white;
    color: #7ED2FF;
    border: 1px solid;
}

.re_delete {
    background-color: #FF6C6C;
}

.re_delete:hover {
    background: white;
    color: #FF6C6C;
    border: 1px solid;
}
.prc_program {
    width: 80%;
    /* border: 1px solid #ccc; */
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    border-radius: 5px;
}
.prc_name {
    width: 90%;
    /* border: 1px solid #ccc;     */
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    display: flex;
    margin: auto;
    margin-top: 15px;
    border-radius: 5px;
}
.qwer {
    width: 90%;
    margin: auto;
    margin-bottom: 50px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #00C7AE;

}
.prcn_text {
    width: 750px;
    height: 35px;
    line-height: 35px;
    margin: 5px;
    /* margin-right: 10px; */
    text-align: center;
    font-size: 20px;
    /* border: 1px solid #ccc; */
    border-radius: 5px;
}
.font_title {
    font-size: 26px;
    /* float: left; */
    width: 8%;
    /* border: 1px solid #ccc;     */
    /* box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5); */
    /* display: flex; */
    /* flex-wrap: wrap; */
    margin-top: 30px;
    margin-left: 45px;
    border-radius: 5px;
}
.naeyong {
    border: 1px solid rgb(194, 192, 192);
    margin: auto;
    margin-top: 20px;
    /* box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5); */
    width: 90%;
    height: 250px;
    resize: none;
    border-radius: 10px;
    padding: 10px;
}

.prc_date {
    float: right;
    font-size: 20px;
    width: 200px;
    display: flex;
    padding-top: 10px;
    border-left: 0px;
    margin-right: 40px;
}
/* .as {
    width: 80%;
    margin: auto;
    box-shadow: 2px 2px 5px #00C7AE;
    border-radius: 20px;
    height: 100%; */
/* } */
</style>