<template>
    <div>
      <div class="sort_right">
        &nbsp;&nbsp;
        <!-- 드롭다운 대신 select 요소 사용 -->
        <select name="sort1" id="sort1" @change="handleSortChange">
          <option value="default">기본 정렬</option>
          <option value="마감순">마감순</option>
          <option value="조회순">조회순</option>
          <option value="평점순">평점순</option>
        </select>
      </div>

      <main class="prolist_main">
        <div class="prolist_list">
          <!-- 프로그램 목록을 순회하며 표시 -->
          <div v-for="(program, index) in pagedProgramList" :key="index" class="program_item">
            <!-- 프로그램 상세 페이지로 이동하는 링크 -->
            <router-link :to="`/prodetail/${program.PRO_NO}`" class="page-button">
            <div class="program_image">
                <!-- 이미지 표시 -->
                <img :src="program.IMG_PATH ? require(`../../../bodytrue_back/uploads/program/${program.IMG_PATH}`) : '/goodsempty2.jpg'" alt="상품 이미지">
            </div>
            <div class="program_details">
              <!-- 프로그램 이름 표시 -->
              <p class="program_name">{{ program.PRO_NAME }} </p>
              <!-- 트레이너 이름 표시 -->
              <p class="trainer_name">{{ program.PRO_TRAINER }}</p>
              <!-- 평점 표시 -->
              <p class="rating"><span class="star-rating">{{ program.PRO_RATE_AVG || 0}}</span></p>
            </div>
            </router-link>
          </div>
        </div>
      </main>
      <!-- 페이징 -->
    <div class="pagination">
      <ul class="number_box">
        <li @click="prevPageGroup" :class="{disabled: currentPageGroup === 1}">
          <img src="../image/prev.png"/>
        </li>
        <li v-for="page in currentGroupPages" :key="page" @click="changePage(page)" :class="{active: page === currentPage}">
          {{ page }}
        </li>
        <li @click="nextPageGroup" :class="{disabled: currentPageGroup === pageGroups.length}">
          <img src="../image/next.png"/>
        </li>
      </ul>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProgramList',
    data() {
      return {
      programList: [], // 프로그램 목록 데이터
      currentPage: parseInt(this.$route.query.page) || 1, // 현재 페이지, // 현재 페이지
      itemsPerPage: 12, // 페이지당 항목 수
      currentPageGroup: 1, // 현재 페이지 그룹
      };
    },
    created() {
      // 컴포넌트 생성 시 프로그램 목록을 가져옴
      this.getProgramList();
    },
    computed: {
    totalPages() {
      return Math.ceil(this.programList.length / this.itemsPerPage);
    },
    pagedProgramList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.programList.slice(start, end);
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
    methods: {
      async getProgramList() {
        // 현재 라우터의 쿼리 파라미터를 가져와 정렬 옵션을 설정
        const sortOption = this.$route.query.sort || 'default'; // 기본값 설정
        const pro_tag = this.$route.params.pro_tag;

        let url = `http://localhost:3000/user/programlist/${pro_tag}`; // 기본 데이터 가져오기 URL
  
        // 정렬 옵션에 따라 URL 변경
        switch (sortOption) {
          case '마감순':
            url = `http://localhost:3000/user/programlist/${pro_tag}/sortbyenddate`;
            break;
          case '조회순':
            url = `http://localhost:3000/user/programlist/${pro_tag}/sortbyviews`;
            break;
          case '평점순':
            url = `http://localhost:3000/user/programlist/${pro_tag}/sortbyrating`;
            break;
          default:
            break;
        }
  
        try {
          const response = await axios.get(url);
          this.programList = response.data; // 데이터를 받아와 프로그램 목록에 설정
          console.log("pro",this.programList);
        } catch (error) {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        }
      },
      handleSortChange(event) {
        const selectedSortOption = event.target.value;
        this.$router.push({ name: 'ProgramList', query: { sort: selectedSortOption } }); // 쿼리 파라미터 설정
      },
      changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.$router.push({ name: 'ProgramList', query: { sort: this.$route.query.sort, page: this.currentPage } }); // URL에 페이지 번호 포함
      }
    },
    prevPageGroup() {
      if (this.currentPageGroup > 1) {
        this.currentPageGroup--;
        this.changePage(this.pageGroups[this.currentPageGroup - 1].start);
      }
    },
    nextPageGroup() {
      if (this.currentPageGroup < this.pageGroups.length) {
        this.currentPageGroup++;
        this.changePage(this.pageGroups[this.currentPageGroup - 1].start);
      }
    },
    },
    watch: {
      '$route.query.sort': 'getProgramList', // 쿼리 파라미터가 변경될 때마다 목록을 다시 가져옴
      '$route.query.page'(newPage) {
        this.currentPage = parseInt(newPage) || 1;
      },
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
    width: 100%; /* 전체 너비의 80%로 설정 */
}

/* 프로그램 목록 리스트 스타일 */
.prolist_list {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* 전체 이미지 그리드를 왼쪽 정렬로 설정 */
    padding: 20px;
    margin: 0 auto;

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
/* 프로그램 썸네일 이미지 스타일 */
.program_image img {
  max-width: 220px; /* 이미지의 최대 너비 설정 */
  max-height: 220px; /* 이미지의 최대 높이 설정 */
  min-width: 220px; /* 이미지의 최소 너비 설정 */
  min-height: 220px; /* 이미지의 최소 높이 설정 */
  overflow: hidden; /* 넘치는 부분을 숨기기 위해 설정 */
  padding: auto; /* 패딩을 자동으로 설정 */
  border-radius: 10px; /* 이미지의 모서리를 둥글게 만드는 정도 설정 */
  background-color: #eeeeee; /* 이미지가 로드되기 전에 보여질 배경색 설정 */
  height: auto; /* 이미지의 높이를 자동으로 조정하여 원본 비율 유지 */
  display: block; /* 이미지가 inline 요소로 표시되는 것을 방지하여 블록 요소로 변경 */
  object-fit: cover;
}
.program_details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px; /* 내부 여백 설정 */
}

.program_details p {
  margin: 0; /* 문단의 기본 마진을 제거하여 줄 간격을 없앱니다. */
  width: 80%; /* 부모 요소인 .program_details 너비에 맞춤 */
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
.pagination{
        width: 100%;
        margin: 0 auto;
        text-align: center;
        padding-top: 10px;
        margin-bottom: 20px;
    }
    .pagination .number_box{
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        width: 150px;
        margin: 0 auto;
        cursor: pointer;
    }
    .number_box li{
        width: 20px;
    }
    .number_box li.active{
        background-color: #00c8c8;
        border-radius: 5px;
        /* color: white; */
        cursor: pointer;
    }
    .number_box img{
        width:15px;
        cursor: default;
    }


</style>