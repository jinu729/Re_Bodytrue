<template>
    <div>
        <div class="admin_userlist-main">
        <div class="admin_userlist-bodyheader">
            리뷰 관리
        </div>

        <div class="admin_userlist-bodycontent">
            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>작성일</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>트레이너명</th>
                    </tr>
                </thead>
                <tr v-for="(review, i) in paginatedReviews" :key="i">
                    <td>{{ review.re_no }}</td>
                    <td>{{ review.re_date }}</td>
                    <button class="pro_name" @click="reviewdetail(review.re_no)">{{ review.pro_name }}</button>
                    <td>{{ review.user_name }}</td>
                    <td>{{ review.tr_name }}</td>
                </tr>
            </table>
            <ul class="admin_page">
                <li v-for="page in totalPages" :key="page">
                    <a href="#" @click.prevent="gotoPage(page)" :class="{ active: page === currentPage }">
                        {{ page }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            reviewList: [],
            currentPage: 1,
            perPage: 10,
        };
    },
    computed: {
        paginatedReviews() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.reviewList.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.reviewList.length / this.perPage);
        }
    },
    methods: {
        getReviewList() {
            console.log('Fetching review list...');
            axios.get('http://localhost:3000/admin/adminreview')
            .then(response => {
                console.log('Response:', response.data);
                if (Array.isArray(response.data)) {
                    this.reviewList = response.data;
                    console.log("this.reviewL",this.reviewList);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching review list:', error);
            });
        },
        gotoPage(page) {
            this.currentPage = page;
        },
        reviewdetail(re_no) {
            const review = this.reviewList.find(item => item.re_no === re_no);
            
            if (review && review.img_path) {
                console.log("Review image path:", review.img_path);
                // 이미지 경로가 있는 경우에만 리뷰 디테일 페이지로 이동합니다.
                this.$router.push(`/reviewdetail/${re_no}`);    
                } else {
                    this.$router.push(`/reviewdetail2/${re_no}`); 
                }
        }
    },
    mounted() {
        console.log('Component mounted.');
        this.getReviewList();
    }
};
</script>

<style scoped>
.admin_userlist-main {
    width: 80%; /* 부모 요소가 이미 중앙 정렬되므로 100% 너비 사용 */
    margin: 0 auto;
    padding: 2px; /* 내부 패딩을 10px로 설정 */
    margin-top: 20px;
}
/*헤더부분(=회원목록)*/
.admin_userlist-bodyheader {
    background-color: #00C7AE; /* 배경색을 청록색으로 설정 */
    color: #fff; /* 텍스트 색상을 흰색으로 설정 */
    padding: 10px 10px; /* 상하 패딩 10px, 좌우 패딩 20px 설정 */
    font-weight: bold; /* 폰트를 굵게 설정 */
    font-size: 26px; /* 폰트 크기를 24px로 설정 */
    border-radius: 10px 10px 10px 10px; /* 상단 좌우 모서리를 둥글게 설정 */
    padding-left:20px;
}

/*회원목록테이블*/
.admin_userlist-bodycontent {
    /* background-color: #97cfcb; */
    color: #111111;
    /* border: 2px solid #3b4746; */
    width: 100%;
    height: 400px;
    font-size: 18px;
    text-align: center;
    margin: auto;
    border-collapse: collapse;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
}


.admin_userlist-bodycontent table{
    border-collapse: collapse;
}

.admin_userlist-bodycontent tr{
    border: 1px solid #3b4746;
}

.admin_userlist-bodycontent th{
    background-color: #aaaaaad2;
}

.admin_userlist-bodypaging{
    padding-top: 15px;
}
.admin_page {
    display: flex;
    gap: 10px;
    list-style: none;
    padding: 0;
    justify-content: center;
}
.admin_page li {
    display: inline;
}
.admin_page a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: #000;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}
.admin_page a.active {
    background-color: #00bfa5;
    color: white;
    margin: 30px;
}
.admin_page a:hover {
    background-color: #ddd;
}
.pro_name {
    background-color: white;
    border: none;
}

/* admin_userlist main 스타일 끝 */

/* 반응형 웹을 위한 미디어 쿼리 시작 */
@media (max-width: 768px) {
    header .wrap {
        flex-direction: column; /* 플렉스 방향을 수직으로 변경 */
        align-items: flex-start; /* 자식 요소들을 왼쪽으로 정렬 */
    }
    .nav_right .icon_list {
        flex-direction: column; /* 플렉스 방향을 수직으로 변경 */
        align-items: flex-start; /* 자식 요소들을 왼쪽으로 정렬 */
    }
    .icon_list .item {
        margin: 5px 0; /* 위아래 여백을 5px로 설정 */
    }
    .icon_list .line {
        display: none; /* 구분선을 숨김 */
    }
    .admin_userlist-main {
        width: 100%; /* 작은 화면에서는 전체 너비 사용 */
        padding: 10px; /* 내부 패딩을 10px로 설정 */
    }
}
/* 반응형 웹을 위한 미디어 쿼리 끝 */

</style>