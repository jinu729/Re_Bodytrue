<template>
  <div v-if="isOpen" class="popup">
    <div class="popup-content">
      <header>
        <div>
          <h1>리뷰 작성</h1>
        </div>
      </header>
      <main class="review-main">
        <div class="review-img">
          <div>
            <img :src="reimgData.img_path ? require(`../../../bodytrue_back/uploads/review/${reimgData.img_path}`) : '/goodsempty2.jpg'" alt="Profile Picture">
            <input type="file" name="review_image" accept="image/*" ref="img" @change="uploadFile($event.target.files, 0)">
          </div>
          <div class="review-title">
            <h1>{{ reviewData.pro_name }}</h1>
            <h3>평점&nbsp;</h3>
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
            </div>
          </div>
        </div>
        <div class="additional-text">
          <label for="review-text"><h1>리뷰 작성란</h1></label>
          <textarea id="review-text" v-model="reviewComment" rows="8" placeholder="리뷰를 작성하세요"></textarea>
        </div>
        <div class="action-buttons">
          <button @click="submitReview" class="submit-btn">등록</button>
          <button type="button" @click="closeModal" class="cancel-btn">취소</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
  watch: {
    isOpen(newval) {
      if (!newval) {
        this.resetReview();
      }
    }
  },
  data() {
    return {
      re_img: "",
      reviewComment: this.reviewData.re_comment || '',
      reviewRate: this.reviewData.re_rate || 0,
      starsSet: this.reviewData.re_rate || 0,
      starsHover: 0,
      reimgData:{},
    };
  },
  mounted(){
    // this.getreimg();
  },

  methods: {
    setReviewRate(rate) {
      this.reviewRate = rate;
    },
    handleStarHover(index) {
      this.starsHover = index + 1;
    },
    resetStarHover() {
      this.starsHover = 0;
    },
    handleStarClick(index) {
      this.starsSet = index + 1;
      this.setReviewRate(this.starsSet);
    },
    //리뷰 버튼 누르면 보내기
    async submitReview() {
      const review = {
        ...this.reviewData,
        re_comment: this.reviewComment,
        re_rate: this.reviewRate,
        re_img: this.re_img
      };
      try {
        let response;
        if (review.re_no && review.re_img) {
          response = await axios.post('http://localhost:3000/user/updatere2', review);
          console.log("수정된리뷰넘버",review.re_no);
        }else if(review.re_no){
          response = await axios.post('http://localhost:3000/user/updatere', review);
        }else if(review.re_img) {
          response = await axios.post('http://localhost:3000/user/makereview2', review);
        } else{
          response = await axios.post('http://localhost:3000/user/makereview', review);
        }
        console.log("review", response.data);
        this.$emit('review-submitted');
        this.closeModal();
      } catch (error) {
        console.error(error);
      }
    },
    closeModal() {
      this.resetReview();
      this.$emit('close');
    },
    resetReview() {
      this.reviewComment = '';
      this.reviewRate = 0;
      this.starsSet = 0;
      this.re_img = "";  // 이미지도 초기화
    },
    //리뷰 사진 업로드
    async uploadFile(file, type) {
        let name = "";
        if (file) {
            name = file[0].name;
            console.log("name", name);
        } else {
            return; // 파일 미선택 시 반환
        }

        const formData = new FormData();
        formData.append('img', file[0]); // 파일 자체를 전송

        console.log(formData);
        this.fileName = file ? file[0].name : '이미지를 업로드 하세요';

        for (let key of formData.keys()) {
            console.log(key, ":", formData.get(key));
        }

        try {
            const res = await axios({
                url: 'http://localhost:3000/user/upload_img',
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            });

            if (res.data.message == 'success') {
                if (type == 0) {
                    this.re_img = res.data.filename; // 서버가 반환한 파일명으로 수정
                    console.log("0", this.re_img);
                }
            } else {
                this.$swal("DB 에러");
            }
        } catch (e) {
            console.log(e);
        }
      },
      //업로드한 리뷰 이미지 미리보기
      async getreimg(){
        const re_no =this.review.re_no;
        console.log("re_no",re_no);
        try{
                const response = await axios.post(`http://localhost:3000/user/getreimg`,{re_no:re_no});
                const data = response.data
                this.reimgData = data;
                console.log("reimgData",this.reimgData.img_path);
                // this.$router.go(0);
            } catch(error){
                console.error('이미지 데이터 불러오는 중 에러 발생', error);
                this.reimgData = '';
            }

      }

  }
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
