<template>
  <div class="container">
    <div class="left_panel">
    <div class=slider>
      <div class="slides">
        <div>
          <img :src="mainimg.img_path ? require(`../../../bodytrue_back/uploads/program/${mainimg.img_path}`) : '/goodsempty2.jpg'" style="width: 800px; height: 600px; object-fit: cover; " >
          </div>
        <!-- <div class="slide" v-for="(image, index) in images" :key="index">
           메인 이미지 요소
          <img :src="require(`../image/mainpage/${image}`)" :alt="'Slide ' + (index + 1)">
        </div> -->
      </div>
      <!-- <button class="prev" @click="changeSlide(-1)">❮</button>
      <button class="next" @click="changeSlide(1)">❯</button> -->
    </div>
      <!-- <div class="slider">
        <div class="slides">
          <div class="slide"><img src="../image/programlist/요가.png" alt="Image 1"></div>
          <div class="slide"><img src="../image/programlist/프로그램6.jpg" alt="Image 2"></div>
          <div class="slide"><img src="../image/programlist/프로그램8.png" alt="Image 3"></div>
        </div>
        <button class="prev">❮</button>
        <button class="next">❯</button>
      </div> -->
      <div class="tabs">
        <ul>
          <li><a href="#detail1">상세 설명</a></li>
          <li><a href="#price1">가격 안내</a></li>
          <li><a href="#review1">리 뷰</a></li>
        </ul>
      </div>
      <div class="description" id="detail1">
        <h2>상세 설명</h2>
        <p><img :src="proimg.img_path ? require(`../../../bodytrue_back/uploads/program/${proimg.img_path}`) : '/goodsempty2.jpg'" style="width: 800px;  object-fit: cover; "></p>
        <p>{{ programdetail.pro_comment1 }}</p>
        <p>{{ programdetail.pro_comment2 }}</p>
        <p>{{ programdetail.pro_comment3 }}</p>
      </div>
      <div class="price-info" id="price1">
        <h2>가격 안내</h2>
        <p><img :src="priceimg.img_path ? require(`../../../bodytrue_back/uploads/program/${priceimg.img_path}`) : '/goodsempty2.jpg'" style="width: 800px; object-fit: cover; "></p>
        <p>1회 비용: 100,000 원</p>
        <p>3회 비용: 300,000 원</p>
        <p>주의 사항</p>
        <p>수업은 1회당 1시간 동안 진행되며, 수업료는 1회당 10만원입니다.</p>
        <p>미리 예약하셔야 하며, 수용 가능한 인원이 한정되어 있으므로 선착순으로 등록됩니다.</p>
        <p>수업료에는 요가 매트 및 필요한 장비 사용료가 포함되어 있습니다.</p>
      </div>
      <div class="price-info" id="review1">
        <h2>리뷰</h2>
        <div v-for="reviewItem in review" :key="reviewItem.re_no">
          <p v-if="reviewItem.img_path"><img style="width:200px" :src="require(`../../../bodytrue_back/uploads/review/${reviewItem.img_path}`)"></p>
          <p v-else><img src="../../public/nullimg.png"></p>
          <p>{{ naming(reviewItem.user_name) }} 님 : {{ reviewItem.re_comment }} <img style="width:20px; padding-bottom:7px;" src="..\image\star.png" id="star">{{ reviewItem.re_rate }} | 작성 날짜: {{ reviewItem.re_date }}</p>
        </div>
      </div>     
    </div>

    <div class="right-panel">
      <h4 v-if="tagname">#{{ tagname }}</h4>
      <h2><p>{{ programdetail.pro_name }}</p></h2>
      <h3><p>{{ programdetail.tr_name }}</p></h3>
      <h5><p v-if="formattedstartDate">프로그램 시작 날짜&nbsp;:&nbsp;{{ formattedstartDate }}</p></h5>
      <h5><p v-if="formattedEndDate">프로그램 종료 날짜&nbsp;:&nbsp;{{ formattedEndDate }}</p></h5>
      <p><img style="width:20px; padding-bottom:7px;" src="..\image\star.png" id="star">{{ programdetail.rate_avg || 0}}</p>
      <div class="calendar">
        <div class="controls">
          <button @click="previousWeek" class="prev2">이전</button>
          <span>{{ currentYear }}년 {{ weekRange }}</span>
          <button @click="nextWeek" class="next2">다음</button>
        </div>
        <div class="days">
          <div class="day-name" v-for="dayName in dayNames" :key="dayName">{{ dayName }}</div>
          <div class="day" v-for="day in weekDays" :key="day.fullDate" :class="{ 'selected': isSelected(day.fullDate) }" @click="selectDate(day)">
            {{ day.date }}
          </div>
        </div>
        <div class="times">
          <button v-for="(time, index) in times" :key="index" :class="['time-btn', { 'selected' : time === selectedTime }]" @click="selectTime(time)">{{ time }}</button>
        </div>
        <div>
          <h4><p v-if="selectedDate">선택된 날짜: {{ selectedDate.year }}년 {{ selectedDate.month + 1 }}월 {{ selectedDate.date }}일</p></h4>
          <h4><p v-if="selectedTime">선택된 시간: {{ selectedTime }}</p></h4>
          <button @click="checklogin" class="reserve-btn">예약</button>
        </div>
      </div>
      <button class="favorite-btn" @click="checkIfLiked">♥</button>
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
        // program: {}, //프로그램 데이터를 객체로 저장
        times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'], //시간들 배열 나열해줌 
        selectedTime: null, //선택된 시간 정보
        programdetail:{}, //프로그램 디테일 배열로 저장
        review:[], //프로그램 리뷰 배열로 저장 
        pro_no: this.$route.params.pro_no,
        //이미지 슬라이더용
        currentIndex: 0,
        slideWidth: 800,
        slideInterval: 5000,
        images: ['main1.jpg', 'main3.jpg', '메인5.jpg', '메인6.jpg' ,'메인7.jpg'], // 이미지 파일명 배열
        //메인 이미지
        mainimg:{},
        //디테일 이미지
        proimg:{},
        //가격 이미지
        priceimg:{},
        //찜하기전 유효성검사
        checkplike:false,
        //
      };
    },

    mounted() {
      setInterval(() => {
        this.changeSlide(1);
      }, this.slideInterval);
    },

    computed: {
      user(){
        return this.$store.state.user;
      },
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
        return tagmapping[this.programdetail.pro_tag];
      },

      //프로그램 종료 날짜 format
      formattedEndDate() {
      // pro_enddate가 존재할 때만 포맷을 변경
      if (this.programdetail.pro_enddate) {
        const date = new Date(this.programdetail.pro_enddate);
        return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
          }).replace('. ', '-').replace('. ', '-').replace('.', ''); // 'YYYY. MM. DD.' 형식을 'YYYY-MM-DD'로 변경
       }
        return '';
      },
      formattedstartDate() {
      // pro_enddate가 존재할 때만 포맷을 변경
      if (this.programdetail.pro_startdate) {
        const date = new Date(this.programdetail.pro_startdate);
        return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
          }).replace('. ', '-').replace('. ', '-').replace('.', ''); // 'YYYY. MM. DD.' 형식을 'YYYY-MM-DD'로 변경
       }
        return '';
      }

    },

    created() {
      this.initWeek(); // 컴포넌트가 생성될 때 주를 초기화
      this.pro_comment();
      this.getmainimg();
      this.getdetailimg();
      this.getpriceimg();

      //id값 임의로 넣어주기 위함
      // this.$store.commit('user', { user_email: 'aaa@naver' , user_no: 1 });

      console.log("store",this.$store.state.user);
      console.log("user_no",this.$store.state.user.user_no);
    },

    methods: {
      //메인 이미지
      async getmainimg(){
        const pro_no = this.$route.params.pro_no;
        try{
          const response = await axios.post(`http://localhost:3000/user/promain`,{pro_no:pro_no});
          const data = response.data[0]
          this.mainimg = data;
          console.log("mainimg:", this.mainimg.img_path);
        } catch(error){
          console.error('메인 이미지 데이터 에러 발생', error);
          // this.mainimg = '';
        }
      },
      //상세 이미지
      async getdetailimg(){
        const pro_no = this.$route.params.pro_no;

        try{
          const response = await axios.post(`http://localhost:3000/user/proimg`, {pro_no:pro_no});
          const data = response.data[0]
          this.proimg = data;
          console.log("proimg", this.proimg.img_path);
        } catch(error){
          console.error('디테일 이미지 에러 발생',error);
        }
      },
      //가격 이미지
      async getpriceimg(){
        const pro_no = this.$route.params.pro_no;
        try{
          const response = await axios.post(`http://localhost:3000/user/priceimg`, {pro_no: pro_no});
          const data = response.data[0]
          this.priceimg = data;
          console.log("priceimg", this.priceimg.img_path);
        } catch(error){
          console.error('가격 이미지 에러 발생',error);
        }
      },

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
        console.log("selectday",this.selectDate);
      },
      // 주어진 날짜가 선택된 날짜인지 확인
      isSelected(fullDate) {
        return this.selectedDate && this.selectedDate.fullDate === fullDate;
      },
      // 선택된 날짜를 프로그램 종료날짜와 비교 해서 값 저장중임 
      saveDate() {
        if(this.selectedDate && this.formattedEndDate){
          const selectedDateObj = new Date(this.selectedDate.year, this.selectedDate.month, this.selectedDate.date);
          const startDateObj = new Date(this.formattedstartDate)
          const endDateObj = new Date(this.formattedEndDate)
          const currentDateObj = new Date();
          if(selectedDateObj < startDateObj){
            this.$swal('선택된 날짜는 예약 시작일보다 뒤에 있습니다. 다시 선택해주세요.');
            return false;
          } else if(selectedDateObj < currentDateObj){
            this.$swal('선택된 날짜는 현재 날짜보다 뒤에 있습니다. 다시 선택해주세요.');
            return false;
            } else if(selectedDateObj > endDateObj ){
              this.$swal('선택된 날짜는 예약 종료일보다 앞서있습니다. 다시 선택해주세요.');
              return false;
            }
            else{
                console.log('선택된 날짜:', this.selectedDate);
                return true;
          }
       } 
       return false;
      },

      // 이전 주로 이동
      previousWeek() {
        const currentDateObj = new Date(this.currentYear, this.currentMonth, this.currentDate);
        currentDateObj.setDate(currentDateObj.getDate() - 7); // 현재 날짜를 7일 전으로 설정
        this.currentYear = currentDateObj.getFullYear(); // 연도 업데이트
        this.currentMonth = currentDateObj.getMonth(); // 월 업데이트
        this.currentDate = currentDateObj.getDate(); // 일 업데이트
        this.selectedDate = null;
        this.selectedTime = null;
        this.initWeek(); // 주를 다시 초기화
      },
      // 다음 주로 이동
      nextWeek() {
        const currentDateObj = new Date(this.currentYear, this.currentMonth, this.currentDate);
        currentDateObj.setDate(currentDateObj.getDate() + 7); // 현재 날짜를 7일 후로 설정
        this.currentYear = currentDateObj.getFullYear(); // 연도 업데이트
        this.currentMonth = currentDateObj.getMonth(); // 월 업데이트
        this.currentDate = currentDateObj.getDate(); // 일 업데이트
        this.selectedDate = null;
        this.selectedTime = null;
        this.initWeek(); // 주를 다시 초기화
      },

      //로그인확인
      checklogin(){
        if(this.user.user_no==''){
          alert('로그인 해주세요.');
          this.$router.push({ path: '/login'});
        } else{
          if(!this.selectedDate){
            alert('날짜를 선택해주세요!');
            return;
          }
          if(!this.selectedTime){
            alert('시간을 선택해주세요!');
            return
          }
          //로그인 되어있으면 예약진행하기전 유효성 검사후 예약진행
          if(this.saveDate()){
              this.makeReserve();
          }
        }
      },
      
      async makeReserve(){
        try{
          //필요한 데이터 수집
          const cal_pro_no = this.pro_no;
          console.log("cal_pro_no", cal_pro_no);
          const cal_user_no = this.user.user_no;
          const cal_tr_no = this.programdetail.pro_tr_no;
          // 선택한 날짜와 시간을 합쳐서 cal_startdate를 생성
          const cal_startdate = `${this.selectedDate.year}-${String(this.selectedDate.month + 1).padStart(2, '0')}-${String(this.selectedDate.date).padStart(2, '0')} ${this.selectedTime}:00`;
          console.log("cal_startdate", cal_startdate);

          const startDateObj = new Date(`${cal_startdate} UTC`);
          
          // 1시간을 더해서 cal_enddate를 계산
          const endDateObj = new Date(startDateObj.getTime() + 60 * 60 * 1000);
          const cal_enddate = endDateObj.toISOString().slice(0, 19).replace('T', ' ');

          console.log("cal_enddate", cal_enddate);

          // 데이터 확인 로그 추가
          console.log("예약 요청 데이터:", {
            pro_no: cal_pro_no,
            user_no: cal_user_no,
            tr_no: cal_tr_no,
            startdate: cal_startdate,
            enddate: cal_enddate,
          });
        
          //서버로 요청 보내기
          const response = await axios.post('http://localhost:3000/user/calendarin', {
            pro_no: cal_pro_no,
            user_no: cal_user_no,
            tr_no: cal_tr_no,
            startdate: cal_startdate,
            enddate: cal_enddate,
          });

          //성공시 처리
          console.log('예약 성공:', response.data);
          alert('예약이 성공적으로 완료되었습니다.');
        } catch(error){
          //에러처리
          console.error('예약 실패:', error);
          alert('해당 시간엔 이미 예약이 존재합니다.');
        }
      },
      
      //상품 디테일 정보 
      async pro_comment(){
        const pro_no = this.$route.params.pro_no;
        console.log(pro_no);
        try{
          const response = await axios.get(`http://localhost:3000/user/prodetail/${pro_no}`);
          const data = response.data;
          this.programdetail = data.productDetails[0];
          console.log("programdetail",this.programdetail);
          this.review = data.reviews;
          console.log("review",this.review);
        } catch(error){
          console.error('프로그램 정보를 불러오는 중 오류 발생', error);
        }
      },
      // //pro_comment메소드 시작, 메소드를 통해서 서버단의 데이터베이스값 가져옴 
      // pro_comment(){
      //   const pro_no = this.$route.params.pro_no;
      //   console.log(pro_no);
      //   axios.get(`http://localhost:3000/user/prodetail/${pro_no}`)
      //       .then(response =>{
      //           this.program = response.data; //데이터를 받아서 저장
      //           console.log("program",this.program);
      //           this.programdetail = this.program.productDetails[0];
      //           console.log(this.programdetail);
      //           this.review = this.program.reviews;
      //           console.log(this.review);
      //       })
      //       .catch(error => {
      //           console.error('프로그램 정보를 불러오는 중 오류 발생', error);
      //       });
      // },

      //찜하기 전 유효성 검사
      async checkIfLiked() {
        if (this.user.user_no) {
          const plike_pro_no = this.pro_no;
          const plike_user_no = this.user.user_no;
          // console.log("plike_pro_no",plike_pro_no);
          // console.log("plike_user_no",plike_user_no);
          try {
            const response = await axios.post('http://localhost:3000/user/checkplike', {
              plike_user_no: plike_user_no,
              plike_pro_no: plike_pro_no,
            });
            this.checkplike = response.data.checkpliked;
            console.log("this.checkplike",this.checkplike);
            if(!this.checkplike){ //유효성 검사해서 없으면 makePlike
              this.makePlike();
            } else{ //있으면 찜 삭제하기위해서 deletePlike
              this.deletePlike();
            }
          } catch (error) {
            console.error('찜 확인 도중 오류 발생', error);
          }
        }
      },
    //
      async makePlike() {
        if (this.user.user_no == '') {
          alert('로그인 해주세요.');
          this.$router.push({ path: '/login' });
        } else {
          const plike_pro_no = this.pro_no;
          const plike_user_no = this.user.user_no;
          const response = await axios.post('http://localhost:3000/user/makeplike', {
            plike_user_no: plike_user_no,
            plike_pro_no: plike_pro_no,
          });
            console.log('찜하기 성공', response.data);
            alert('찜목록에 추가되었습니다.');
        }
      },
      async deletePlike(){
        const plike_pro_no = this.pro_no;
        const plike_user_no = this.user.user_no;
        const response = await axios.post('http://localhost:3000/user/delplike', {
          plike_user_no: plike_user_no,
          plike_pro_no: plike_pro_no,
          });
          console.log('찜 삭제 성공', response.data);
          alert('찜목록에서 삭제되었습니다.');
      },
      //times 메소드
      selectTime(time){
        this.selectedTime = time;
      },
      naming(username){
            if(!username){
                return '';
            }
            const making = username.slice(0,1) + '**';
            return making;
        },

      changeSlide(direction) {
        const slideCount = this.images.length;
        this.currentIndex = (this.currentIndex + direction + slideCount) % slideCount;
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
    margin-top: 20px;
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
  .reserve-btn {
      width: 100%;
      padding: 15px;
      margin-top: 20px;
      border: none;
      cursor: pointer;
      box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
      border-radius: 5px;
  }
  .favorite-btn{
      width: 100%;
      color:red;
      margin-top: 20px;
      border: none;
      cursor: pointer;
      font-size:40px;
      box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
      border-radius: 5px;
      background-color: transparent;
  }
    .favorite-btn:hover{
      width: 100%;
      color:rgb(255, 255, 255);
      margin-top: 20px;
      border: none;
      cursor: pointer;
      font-size:40px;
      box-shadow: 2px 2px 5px rgba(255, 97, 97, 0.5);
      border-radius: 5px;
      background-color: #ff7979
  }
  .reserve-btn {
      background-color: #00c8c8;
      color: #fff;
  }
  /*시간 버튼*/ 
  .time-btn {
    width: 100px;
    height: 50px;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 30px;
    text-align: center; /* 텍스트 중앙 정렬 */
    font-weight: bold; /* 텍스트 굵게 */
    font-size: 15px;
  }

  .time-btn.selected {
  /* 선택된 버튼 스타일 */
  background-color: #00c8c8;
  color: white;
  border-radius: 30px;
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
   .calendar .reserve-btn:hover {
    background-color: #00d0ffca;
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
  .calendar .prev2:hover{
      background-color: #333; /* 배경색 */
      color: #ffffff; /* 텍스트 색상 */
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
  .calendar .next2:hover{
      background-color:#00c8c8; /* 배경색 */
      color: #ffffff; /* 텍스트 색상 */
      padding: 8px 16px; /* 패딩 */
      border: 1px solid #ccc; /* 테두리 */
      cursor: pointer; /* 마우스 오버 시 포인터로 변경 */
      font-size: 14px; /* 글꼴 크기 */
      border-radius: 30px; /* 둥근 모서리 */
  
  }
  </style>