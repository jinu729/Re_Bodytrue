<template>
    <div>
      <div class="sort_right">
        &nbsp;&nbsp;
        <select name="sort1" id="sort1" @change="handleSortChange">
          <option value="마감순">마감순</option>
          <option value="조회순">조회순</option>
          <option value="평점순">평점순</option>
        </select>
      </div>
      <main class="prolist_main">
        <div class="prolist_list">
          <!-- Program Items -->
          <div v-for="(program, index) in programList" :key="index" class="program_item">
            <div class="program_image">
              <img :src="`../../../bodytrue_back/uploads/program/${program.IMG_PATH}`" alt="Program Image">
            </div>
            <div class="program_details">
              <p class="program_name">{{ program.PRO_NAME }} </p>
              <p class="trainer_name">{{ program.PRO_TRAINER }}</p>
              <p class="rating"><span class="star-rating">{{ program.PRO_RATE_AVG }}</span></p>

            </div>
          </div>
        </div>
      </main>
      <!-- 이전 페이지로 가는 버튼 -->
      <button v-if="currentPage > 1" @click="gotoPreviousPage">이전 페이지로</button>
        
        <!-- 다음 페이지로 가는 버튼 -->
        <button v-if="currentPage < totalPages" @click="gotoNextPage">다음 페이지로</button>
    </div>
  </template>


<script>
import axios from 'axios';

    export default {
  name: 'ProgramList',
  data() {
    return {
      programList: [] // 프로그램 데이터 배열
    };
  },
  created(){
    this.getProgramList();
  },
  mounted() {
    this.getProgramList(); // 컴포넌트가 마운트된 후 프로그램 데이터를 가져옴
  },
  methods: {
    async getProgramList() {
      try {
        const response = await axios.get('http://localhost:3000/user/programlist'); // 백엔드 엔드포인트 URL
        this.programList = response.data; // 가져온 데이터를 Vue 데이터에 할당
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    }
  }
};
</script>

<style scoped>

/* 프로그램 목록 페이지 */
/* 우측 정렬된 섹션 스타일 */
.sort_right {
    width: 80%; /* 전체 너비의 80%로 설정 */
    height: 5%; /* 높이 설정 */
    margin: auto; /* 가운데 정렬을 위한 자동 마진 */
    padding-top: 30px; /* 위쪽 여백 설정 */
    padding-right: 50px; /* 오른쪽 패딩 설정 */
}

/* 정렬 옵션 스타일 */
#sort1 {
    float: right; /* 우측 정렬 */
    font-size: 20px; /* 글자 크기 */
    width: 120px; /* 너비 설정 */
}

/* 프로그램 목록 메인 컨테이너 */
.prolist_main {
    width: 80%; /* 전체 너비의 80%로 설정 */
    margin-left: auto ;
    margin-right: auto;
}

/* 프로그램 목록 리스트 스타일 */
.prolist_list {
    display: flex;
            flex-wrap: wrap;
            justify-content: flex-start; /* 전체 이미지 그리드를 왼쪽 정렬로 설정 */
            padding: 20px;

}

/* 프로그램 아이템 스타일 */
.program_item {
     width: calc(25% - 10px); /* 각 이미지 아이템의 너비 설정 */
     margin-right: 10px; /* 오른쪽 마진 설정 */        
     margin-bottom: 20px; /* 아래쪽 마진 설정 */
     box-sizing: border-box;
     position: relative;
    overflow: hidden;
    border-radius: 5px;
}
.program_name {
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 부분 숨김 */
  text-overflow: ellipsis; /* 넘치는 부분에 ... 표시 */
}
/* 프로그램 이미지 스타일 */
.program_image {
    width: 100%;
            height: 200;
            object-fit: cover;
            border-radius: 5px;
}
.star-rating {
    display: inline-block;
    background-image: url('../image/review/star.png'); /* 별표 이미지 파일 경로로 대체 */
    width: 15px; /* 별표 이미지의 너비 */
    height: 15px; /* 별표 이미지의 높이 */
    background-size: contain; /* 이미지 크기에 맞게 조정 */
    line-height:20px;
    text-indent: 22px; /* 텍스트를 숨기기 위해 사용 */

}


</style>