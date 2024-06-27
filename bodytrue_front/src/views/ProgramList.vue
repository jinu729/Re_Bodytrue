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
        <div v-for="(program, index) in programs" :key="index" class="program_item">
            <div class="program_image">
                <img id="proimage" :src="'../image/programlist/' + program.imageName">
            </div>
            <div class="program_details">
                <p class="program_name">{{ program.name }} <span class="rating">★ {{ program.averageRating }}</span></p>
                <p class="trainer_name">{{ program.trainerName }}</p>
            </div>
        </div>
    </div>
</main>
    </div>
    
</template>


<script>
import axios from 'axios';

export default {
    name: 'ProductList',
    data() {
        return {
            programs: [] // 프로그램 데이터 배열
        };
    },
    mounted() {
        this.getPrograms(); // 컴포넌트가 마운트된 후 프로그램 데이터를 가져옴
    },
    methods: {
    async getPrograms() {
      try {
        // 백엔드 엔드포인트 URL로 수정 필요
        const response = await axios.get('http://localhost:3000/programs');
        this.programs = response.data; // 가져온 데이터를 Vue 데이터에 할당
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    },
    async handleSortChange(event) {
      const sortType = event.target.value;
      try {
        // 백엔드 엔드포인트 URL로 정렬된 데이터 요청
        const response = await axios.get(`http://localhost:3000/programs?sort=${sortType}`);
        this.programs = response.data; // 정렬된 데이터를 Vue 데이터에 할당
      } catch (error) {
        console.error('정렬된 데이터를 가져오는 중 오류 발생:', error);
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

/* 프로그램 이미지 스타일 */
#proimage {
    width: 100%;
            height: 200;
            object-fit: cover;
            border-radius: 5px;
}


</style>