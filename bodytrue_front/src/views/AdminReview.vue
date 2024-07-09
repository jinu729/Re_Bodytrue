<template>
    <div>
    <main class="admin_userlist-main"></main>
        <div class="admin_userlist-bodyheader">
            &nbsp;&nbsp;리뷰 관리
        </div>

        <div class="admin_userlist-bodycontent">
            <div>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>작성일</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>트레이너명</th>
                    </tr>
                </thead>
                <tr v-for="(review, i) in reviewList" :key="i">
                    <td>{{ review.re_no }}</td>
                    <td>{{ review.re_date }}</td>
                    <td>{{ review.pro_name }}</td>
                    <td>{{ review.user_name }}</td>
                    <td>{{ review.tr_name }}</td>
                </tr>
            </div>
            <div class="admin_userlist-bodypaging">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
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

    },
    method: {
        getReviewList() {
            axios.get('http://localhost:3000/admin/adminreview')
            .then(response => {
                this.reviewList = response.data;
            })
            .catch(error => {
                console.error('Error fetching review list:', error);
            });
        }
    }
}
</script>

<style scoped>
.admin_userlist-main {
    width: 100%; /* 부모 요소가 이미 중앙 정렬되므로 100% 너비 사용 */
    margin: 2px 0; /* 위아래 여백을 10px로 설정 */
    padding: 2px; /* 내부 패딩을 10px로 설정 */
}
/*헤더부분(=회원목록)*/
.admin_userlist-bodyheader {
    background-color: #00C7AE; /* 배경색을 청록색으로 설정 */
    color: #fff; /* 텍스트 색상을 흰색으로 설정 */
    padding: 10px 10px; /* 상하 패딩 10px, 좌우 패딩 20px 설정 */
    font-weight: bold; /* 폰트를 굵게 설정 */
    font-size: 26px; /* 폰트 크기를 24px로 설정 */
    border-radius: 10px 10px 10px 10px; /* 상단 좌우 모서리를 둥글게 설정 */
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