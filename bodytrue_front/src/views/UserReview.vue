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
                <img src="../image/free-icon-star-8539511.png" v-for="n in 5" :key="n" @click="setReviewRate(n)">
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
            <button type="button" @click="$emit('close')" class="cancel-btn">취소</button>
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
    },
  },
  data() {
    return {
      // 로컬 데이터로 리뷰 코멘트와 평점을 관리
      reviewComment: this.reviewData.re_comment || '',
      reviewRate: this.reviewData.re_rate || 0,
    };
  },
  methods: {
    // 평점을 설정하는 메소드
    setReviewRate(rate) {
      this.reviewRate = rate;
    },
    // 리뷰를 제출하는 메소드
    async submitReview() {
      const review = {
        ...this.reviewData,
        re_comment: this.reviewComment,
        re_rate: this.reviewRate,
      };
      try {
        // 서버에 리뷰 데이터를 전송
        const response = await axios.post('http://localhost:3000/user/makereview', review);
        console.log(response.data);
        // 성공적으로 전송되면 모달을 닫음
        this.$emit('close');
      } catch (error) {
        console.error(error);
      }
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
</style>
