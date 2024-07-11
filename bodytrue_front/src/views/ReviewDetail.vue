<template>
    <div class="prc_main">
        <div class="prc_title">
            <p>리뷰 관리</p>
        </div>
        <div  class="prc_info">
            <div class="prc_name">
                <span class="label">프로그램 명</span>
                <p>{{ review.pro_name }}</p>
            </div>
            <div class="prc_trainer">
                <span class="label">트레이너명</span>
                <p>{{ review.tr_name }}</p>
            </div>
            <div class="prc_user">
                <span class="label">작성자</span>
                <p>{{ review.user_name }}</p>
            </div>
            <div class="prc_date">
                <span class="label">작성일</span>
                <p>{{ review.re_date }}</p>
            </div>
        </div>
        <div  class="prc_content">
            <span class="label">내용</span>
            <p>{{ review.re_comment }}</p>
        </div>
        <div v-if="review" class="prc_images">
            <span class="label">이미지</span>
            <div class="prci_image" v-for="(image, i) in review.images" :key="i">
                <img :src="image" alt="Review Image" />
            </div>
        </div>
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
        <button class="re_delete" @click="deletereview(review.re_no)">삭제</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            review: {},
            error: ''
        };
    },
    methods: {
        getReviewData() {
            const re_no = this.$route.params.re_no;

            axios.get(`http://localhost:3000/admin/review/${re_no}`)
            .then(response => {
                if (response.data) {
                    this.review = response.data;
                    console.log("review :", this.review);
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
                if (response.data.success) {
                    // 이전 페이지로 이동
                    this.$router.go(-1);
                } else {
                    this.error = 'Failed to delete review';
                }
            })
            .catch(error => {
                this.error = 'Error deleting review: ' + (error.response ? error.response.data.error : error.message);
            });
            
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
    width: 80%;
    margin: auto;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
}

.prc_title p {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

.prc_info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.prc_info > div {
    flex: 1;
    margin-right: 10px;
}

.prc_info > div:last-child {
    margin-right: 0;
}

.label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.prc_content {
    margin-bottom: 20px;
}

.prc_images {
    display: flex;
    justify-content: space-between;
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
</style>