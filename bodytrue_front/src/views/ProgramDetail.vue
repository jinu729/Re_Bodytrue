<template>
  <div class="container">
    <div class="left_panel">
      <div class="slider">
        <div class="slides">
          <div class="slide"><img src="../image/programlist/요가.png" alt="Image 1"></div>
          <div class="slide"><img src="../image/programlist/프로그램6.jpg" alt="Image 2"></div>
          <div class="slide"><img src="../image/programlist/프로그램8.png" alt="Image 3"></div>
        </div>
        <button class="prev">❮</button>
        <button class="next">❯</button>
      </div>
      <div class="tabs">
        <ul>
          <li><a href="#detail1">상세 설명</a></li>
          <li><a href="#price1">가격 안내</a></li>
          <li><a href="#review1">리 뷰</a></li>
        </ul>
      </div>
      <div class="description" id="detail1">
        <h2>상세 설명</h2>
        <p v-if="program.pro_comment1">{{ program.pro_comment1 }}</p>
        <p v-if="program.pro_comment2">{{ program.pro_comment2 }}</p>
        <p v-if="program.pro_comment3">{{ program.pro_comment3 }}</p>
      </div>
      <div class="price-info" id="price1">
        <h2>가격 안내</h2>
        <p>1회 비용: 100,000 원</p>
        <p>3회 비용: 300,000 원</p>
        <p>주의 사항</p>
        <p>수업은 1회당 1시간 동안 진행되며, 수업료는 1회당 10만원입니다.</p>
        <p>미리 예약하셔야 하며, 수용 가능한 인원이 한정되어 있으므로 선착순으로 등록됩니다.</p>
        <p>수업료에는 요가 매트 및 필요한 장비 사용료가 포함되어 있습니다.</p>
      </div>
      <div class="price-info" id="review1">
        <h2>리뷰</h2>
        <p>1회 비용: 100,000 원</p>
        <p>3회 비용: 300,000 원</p>
        <p>주의 사항</p>
        <p>수업은 1회당 1시간 동안 진행되며, 수업료는 1회당 10만원입니다.</p>
        <p>미리 예약하셔야 하며, 수용 가능한 인원이 한정되어 있으므로 선착순으로 등록됩니다.</p>
        <p>수업료에는 요가 매트 및 필요한 장비 사용료가 포함되어 있습니다.</p>
      </div>
      
    </div>

    <div class="right-panel">
      <h4 v-if="tagname">#{{ tagname }}</h4>
      <h2><p v-if="program.pro_name">{{ program.pro_name }}</p></h2>
      <h3><p v-if="program.tr_name">{{ program.tr_name }}</p></h3>
      <p v-if="program.rate_avg"><img src="..\image\star.png" id="star">{{ program.rate_avg }}</p>
      <div class="calendar">
        <div class="controls">
          <button @click="previousWeek" class="prev2">이전</button>
          <span>{{ currentYear }}년 {{ currentMonth + 1 }}월 {{ weekRange }}</span>
          <button @click="nextWeek" class="next2">다음</button>
        </div>
        <div class="days">
          <div class="day-name" v-for="dayName in dayNames" :key="dayName">{{ dayName }}</div>
          <div class="day" v-for="day in weekDays" :key="day.fullDate" :class="{ 'selected': isSelected(day.fullDate), 'empty': !day.isInCurrentMonth }" @click="day.isInCurrentMonth && selectDate(day)">
            {{ day.isInCurrentMonth ? day.date : '' }}
          </div>
        </div>
        <div class="times">
          <button>오전 8:00</button>
          <button>오전 9:00</button>
          <button>오전 10:00</button>
        </div>
        <div>
          <p v-if="selectedDate">선택된 날짜: {{ selectedDate.year }}년 {{ selectedDate.month + 1 }}월 {{ selectedDate.date }}일</p>
          <button @click="saveDate" class="reserve-btn">예약</button>
        </div>
      </div>
      <button class="favorite-btn">♥</button>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(), // 현재 연도
        currentMonth: new Date().getMonth(), // 현재 월 (0부터 시작)
        currentDate: new Date().getDate(), // 현재 일
        weekDays: [], // 현재 주의 날짜 목록
        selectedDate: null, // 선택된 날짜 정보
        dayNames: ['일', '월', '화', '수', '목', '금', '토'], // 요일 이름
        program: {} //프로그램 데이터를 객체로 저장
      };
    },
    computed: {
      // 현재 주의 시작과 끝 날짜를 문자열로 반환
      weekRange() {
        const startOfWeek = this.weekDays[0]; // 주의 첫 날
        const endOfWeek = this.weekDays[6]; // 주의 마지막 날
        return `${startOfWeek.month + 1}월 ${startOfWeek.date}일 - ${endOfWeek.month + 1}월 ${endOfWeek.date}일`;
      },
      //pro_tag 숫자와 네이밍 조합시켜주는거 
      tagname(){
        const tagmapping ={
            0: '다이어트',
            1: '체형교정',
            2: '대회',
            3: '체력증진',
            4: '홈트'
        };
        return tagmapping[this.program.pro_tag];
      }
    },
    created() {
      this.initWeek(); // 컴포넌트가 생성될 때 주를 초기화
      this.pro_comment();
    },
    methods: {
      // 현재 주의 날짜를 계산하여 weekDays에 저장
      initWeek() {
        const currentDateObj = new Date(this.currentYear, this.currentMonth, this.currentDate); // 현재 날짜 객체 생성
        const firstDayOfWeek = currentDateObj.getDate() - currentDateObj.getDay(); // 주의 첫 날 계산
  
        this.weekDays = []; // 주의 날짜 목록 초기화
        for (let i = 0; i < 7; i++) {
          const dateObj = new Date(this.currentYear, this.currentMonth, firstDayOfWeek + i); // 각 날짜 객체 생성
          this.weekDays.push({
            year: dateObj.getFullYear(), // 연도
            month: dateObj.getMonth(), // 월
            date: dateObj.getDate(), // 일
            fullDate: `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`, // YYYY-MM-DD 형식의 날짜 문자열
            isInCurrentMonth: dateObj.getMonth() === this.currentMonth // 현재 월에 속하는지 여부
          });
        }
      },
      // 날짜를 선택하면 selectedDate에 저장
      selectDate(day) {
        this.selectedDate = day;
      },
      // 주어진 날짜가 선택된 날짜인지 확인
      isSelected(fullDate) {
        return this.selectedDate && this.selectedDate.fullDate === fullDate;
      },
      // 선택된 날짜를 저장 (예: 서버로 전송)
      saveDate() {
        console.log('선택된 날짜:', this.selectedDate);
      },
      // 이전 주로 이동
      previousWeek() {
        const currentDateObj = new Date(this.currentYear, this.currentMonth, this.currentDate);
        currentDateObj.setDate(currentDateObj.getDate() - 7); // 현재 날짜를 7일 전으로 설정
        this.currentYear = currentDateObj.getFullYear(); // 연도 업데이트
        this.currentMonth = currentDateObj.getMonth(); // 월 업데이트
        this.currentDate = currentDateObj.getDate(); // 일 업데이트
        this.initWeek(); // 주를 다시 초기화
      },
      // 다음 주로 이동
      nextWeek() {
        const currentDateObj = new Date(this.currentYear, this.currentMonth, this.currentDate);
        currentDateObj.setDate(currentDateObj.getDate() + 7); // 현재 날짜를 7일 후로 설정
        this.currentYear = currentDateObj.getFullYear(); // 연도 업데이트
        this.currentMonth = currentDateObj.getMonth(); // 월 업데이트
        this.currentDate = currentDateObj.getDate(); // 일 업데이트
        this.initWeek(); // 주를 다시 초기화
      },

      //pro_comment메소드 시작
      pro_comment(){
        const pro_no = this.$route.params.pro_no;
        console.log(pro_no);
        axios.get(`http://localhost:3000/user/prodetail/${pro_no}`)
            .then(response =>{
                this.program = response.data[0];
            })
            .catch(error => {
                console.error('프로그램 정보를 불러오는 중 오류 발생', error);
            });
      }
    }
  };
  
  </script>
  <style scoped>
  #star{
    width: 15px;
    padding-right: 5px;
  }

  .container {
    max-width: 1280px;
    display: flex;
    margin: 0 auto;
  }
  
  .programdetailimg{
      padding: 20px;
      width: 600px;
      height: 600px;
  }
  
  .left-panel {
      flex: 3;
      width: 1280px; /* 3:1 비율로 설정 */
      padding: 20px;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      align-items: center;
      
  }
  
  .right-panel {
      flex: 1;
      width: 900px;
      padding: 20px;
      border: 1px solid #525252;
      margin-left: 40px;
      height: fit-content;
      position: sticky;
      top: 20px;
  }
  
  
  /*이미지 슬라이드*/
  .slider {
      position: relative;
      width: 800px;
      margin: auto;
      overflow: hidden; /*박스 밖에 안나가도록 조정*/
      height: 600px;
  }
  
  .slides {
      display: flex;
      transition: transform 0.5s ease-in-out;
      width: 800px;
  }
  
  .slide {
      min-width: 100%;
      box-sizing: border-box;
  }
  
  .slide img {
      width: 800px;
      height: 600px;
      object-fit: cover;
  }
  
  .prev, .next {
      position: absolute;
      top: 50%;
      width: auto;
      padding: 16px;
      margin-top: -22px;
      color: rgb(0, 0, 0);
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 3px;
      user-select: none;
      transform: translateY(-50%);
      background-color: transparent; /* 배경색 투명으로 설정 */
      cursor: pointer;
      border: none; /* 기본 버튼 스타일 제거 */
  }
  
  .prev {
      left: 0;
      border-radius: 0 3px 3px 0;
  }
  
  .next {
      right: 0;
      border-radius: 3px 0 0 3px;
  }
  
  /*태그*/
  .tabs ul {
      list-style: none;
      display: flex;
      justify-content: space-around;
      padding-top: 20px;
      padding-bottom: 20px;
      margin: 0;
      border-bottom: 1px solid #525252;
  }
  .tabs ul li {
      padding: 10px 0;
  }
  
  .tabs ul li a {
      text-decoration: none;
      color: #000;
  }
  
  
  /*예약버튼*/
  .reserve-btn, .favorite-btn {
      width: 100%;
      padding: 15px;
      margin-top: 20px;
      border: none;
      cursor: pointer;
  }
  
  .reserve-btn {
      background-color: #00c8c8;
      color: #fff;
  }
  
  .favorite-btn {
      background-color: #fff;
      border: 1px solid #ddd;
      color: #f00;
  }
  
  /*description*/
  .description{
      padding-top:30px;
      padding-bottom: 50px;
      border-bottom: 1px solid #525252;
  }
  
  /*price-info*/
  .price-info{
      padding-top:30px;
      padding-bottom: 50px;
      border-bottom: 1px solid #525252;
  }
  
  /*review*/
  .review-main {
      width: 60%;
      margin: 0 auto;
      padding-top: 50px;
      padding-bottom: 30px;
      border-bottom: 1px solid #525252;
  }
  
  /*controls*/
  .calendar{
      height: fit-content;
  }
  .calendar .controls {
    display: flex; /* 버튼을 가로로 나열 */
    justify-content: space-between; /* 버튼을 양 끝으로 배치 */
    align-items: center; /* 세로 방향으로 중앙 정렬 */
    margin-bottom: 10px; /* 아래 여백 */
    padding-top:20px;
  }
  .calendar .days {
    display: grid; /* 그리드 레이아웃 사용 */
    grid-template-columns: repeat(7, 1fr); /* 7열 그리드 */
    gap: 5px; /* 그리드 간격 */
    padding-bottom: 10px;
  }
  .calendar .day-name {
    text-align: center; /* 텍스트 중앙 정렬 */
    font-weight: bold; /* 텍스트 굵게 */
  }
  .calendar .day {
    text-align: center; /* 텍스트 중앙 정렬 */
    padding: 5px; /* 내부 여백 */
    cursor: pointer; /* 마우스 커서를 포인터로 변경 */
    border: 1px solid #ccc; /* 테두리 색상 */
    border-radius: 30px;
  }
  .calendar .day.selected {
    background-color: #00c8c8; /* 선택된 날짜 배경색 */
    color: white; /* 선택된 날짜 텍스트 색상 */
    border-radius: 30px;
  }
  .calendar .day.empty {
    cursor: default; /* 빈 날짜는 커서를 기본값으로 변경 */
    background-color: #f5f5f5; /* 빈 날짜 배경색 */
    border: none; /* 빈 날짜 테두리 제거 */
  }
  .calendar .reserve-btn {
    background-color: #00c8c8; /* 배경색 */
    color: #fff; /* 텍스트 색상 */
    padding: 10px 20px; /* 패딩 */
    border: none; /* 테두리 제거 */
    cursor: pointer; /* 마우스 오버 시 포인터로 변경 */
    font-size: 16px; /* 글꼴 크기 */
    border-radius: 5px; /* 둥근 모서리 */
  }
  .calendar .prev2{
      background-color: transparent; /* 배경색 */
      color: #333; /* 텍스트 색상 */
      padding: 8px 16px; /* 패딩 */
      border: 1px solid #ccc; /* 테두리 */
      cursor: pointer; /* 마우스 오버 시 포인터로 변경 */
      font-size: 14px; /* 글꼴 크기 */
      border-radius: 30px; /* 둥근 모서리 */
  
  }
  .calendar .next2{
      background-color: transparent; /* 배경색 */
      color: #333; /* 텍스트 색상 */
      padding: 8px 16px; /* 패딩 */
      border: 1px solid #ccc; /* 테두리 */
      cursor: pointer; /* 마우스 오버 시 포인터로 변경 */
      font-size: 14px; /* 글꼴 크기 */
      border-radius: 30px; /* 둥근 모서리 */
  
  }
  </style>