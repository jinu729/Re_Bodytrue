<!-- ReviewModal.vue -->
<template>
  <!-- 모달이 열려 있을 때만 표시 -->
  <div v-if="isOpen" class="popup">
    <div class="popup-content">
      <header>
        <div>
          <h1>리뷰 작성</h1>
        </div>
      </header>
      <main class="review-main">
        <!-- 폼 제출 시 submitReview 메소드 호출 -->
        <form @submit.prevent="submitReview">
          <div class="review-img">
            <div>
              <!-- 이미지 업로드 -->
              <img  alt="Image 1"><br><br>
              <input type="file" name="review_image" accept="image/*">
            </div>
            <div class="review-title">
              <h1>{{reviewData.pro_name}}</h1>
              <h3>평점&nbsp;</h3>
              <!-- 평점 선택 -->
              <div class="star-img">
                <div v-for="(star, index) in 5" :key="index"
                  :class="{ 'star-filled': index < starsSet, 'star-hovered': index < starsHover }"
                  @mouseenter="handleStarHover(index)" @mouseleave="resetStarHover" @click="handleStarClick(index)">
                  <svg class="star" viewBox="0 12.705 512 486.59">
                    <polygon
                      points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566"
                      :fill="index < starsSet ? '#ffc74f' : '#dddddd'"></polygon>
                  </svg>
                </div>
                <!-- <img src="../image/free-icon-star-8539511.png" v-for="n in 5" :key="n" @click="setReviewRate(n)"> -->
              </div>
            </div>
          </div>
          <div class="additional-text">
            <!-- 리뷰 텍스트 입력 -->
            <label for="review-text"><h1>리뷰 작성란</h1></label>
            <textarea id="review-text" v-model="reviewComment" rows="8" placeholder="리뷰를 작성하세요"></textarea>
          </div>
          <div class="action-buttons">
            <!-- 등록 버튼 클릭 시 폼 제출 -->
            <button type="submit" class="submit-btn">등록</button>
            <!-- 취소 버튼 클릭 시 close 이벤트 발생 -->
            <button type="button" @click="closeModal" class="cancel-btn">취소</button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // 부모 컴포넌트로부터 props를 받아옴
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    reviewData: {
      type: Object,
      required: true,
    }
  },
  watch:{
    isOpen(newval){
      if(!newval){
        this.resetReview();
      }
    }
  },

  data() {
    return {
      // 로컬 데이터로 리뷰 코멘트와 평점을 관리
      reviewComment: this.reviewData.re_comment || '',
      reviewRate: this.reviewData.re_rate || 0,
      starsSet: this.reviewData.re_rate || 0,
      starsHover: 0,
    };
  },
  methods: {
    // 평점을 설정하는 메소드
    setReviewRate(rate) {
      this.reviewRate = rate;
    },
    handleStarHover(index){
      this.starsHover = index +1;
    },
    resetStarHover(){
      this.starsHover =0;
    },
    handleStarClick(index){
      this.starsSet = index + 1;
      this.setReviewRate(this.starsSet);
    },
    // 리뷰를 제출하는 메소드
    async submitReview() {
      const review = {
        ...this.reviewData,
        re_comment: this.reviewComment,
        re_rate: this.reviewRate,
      };
      try {
        let response;
        if(review.re_no) {
          //리뷰 수정
          response = await axios.post(`http://localhost:3000/user/updatere`, review);
        } else {
          //새로운 리뷰 작성
          response = await axios.post(`http://localhost:3000/user/makereview`, review);
        }
        // // 서버에 리뷰 데이터를 전송
        // const response = await axios.post('http://localhost:3000/user/makereview', review);
        console.log(response.data);
        this.$emit('review-submitted');
        // 성공적으로 전송되면 모달을 닫음
        this.closeModal();
      } catch (error) {
        console.error(error);
      }
    },
    closeModal(){
      this.resetReview();
      this.$emit('close');
    },
    //watch에서 isopen이 close 될때마다 reset하도록 수정해놨음
    resetReview(){
      this.reviewComment = '';
      this.reviewRate = 0;
      this.starsSet = 0;
    },

  },
};
</script>

<style scoped>
/* 모달 스타일 */
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
}
textarea{
    width: 100%;
    font-size: 16px; /* 글꼴 크기 */
    resize: vertical; /* 세로 크기만 조절 가능 */
    outline: none; /* 포커스 시 기본 테두리 제거 */
}
.star-img img {
  width: 30px; /* 원하는 너비로 설정 */
  height: 30px; /* 원하는 높이로 설정 */
  cursor: pointer; /* 클릭 가능한 상태로 커서 변경 */
  margin-right: 5px; /* 이미지 간 간격 */
}
.star-img{
  display: flex;
  flex-direction: row;
}
.star{
  width:30px;
  height:30px;
  cursor: pointer;
  margin-right: 5px;
}
.star-filled polygon{
  fill: #f44336;
}
.star-hovered polygon{
  fill:#f44336;
}
.submit-btn{
  width: 100px;
  font-size: 18px;
  margin: 0 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 0;
  background-color:#3fced3;
  color:white;
  border-radius: 5px;
  border: 1px solid;
  box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
}
.submit-btn:hover{
  width: 100px;
  font-size: 18px;
  margin: 0 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 0;
  background-color:#ffffff;
  color:#3fced3;
  border-radius: 5px;
  border: 1px solid;
  box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
}
.cancel-btn{
  width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #d0d0d0;
    color: white;
}
.cancel-btn:hover{
  width: 100px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #000000;
    color: rgb(255, 255, 255);
}
</style>
