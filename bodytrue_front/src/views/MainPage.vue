<template>
    <div>
    <div class="carousel"> 
         <!-- 슬라이드 이미지들을 담는 컨테이너 -->
      <div class="slides" :style="{ transform: `translateX(-${currentIndex * slideWidth}px)` }">
        <div class="slide" v-for="(image, index) in images" :key="index">
            <!-- 메인 이미지 요소 -->
          <img :src="require(`../image/mainpage/${image}`)" :alt="'Slide ' + (index + 1)">
        </div>
      </div>
      <button class="prev" @click="changeSlide(-1)">❮</button>
      <button class="next" @click="changeSlide(1)">❯</button>
    </div>
    <div class="page-buttons">
      <router-link to="/prolist/0" class="page-button">
        <img src="../image/buttonImage/다이어트.png" alt="Page 1"><span>다이어트</span>
      </router-link>
      <router-link to="/prolist/1" class="page-button">
        <img src="../image/buttonImage/체형교정.png" alt="Page 2"><span>체형교정</span>
      </router-link>
      <router-link to="/prolist/2" class="page-button">
        <img src="../image/buttonImage/대회.png" alt="Page 3"><span>대회</span>
      </router-link>
      <router-link to="/prolist/3" class="page-button">
        <img src="../image/buttonImage/체력증진.png" alt="Page 4"><span>체력증진</span>
      </router-link>
      <router-link to="/prolist/4" class="page-button">
        <img src="../image/buttonImage/홈트.png" alt="Page 5"><span>홈트</span>
      </router-link>
    </div>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        currentIndex: 0,
        slideWidth: 800,
        slideInterval: 5000,
        images: ['main1.jpg', 'main3.jpg', '메인5.jpg', '메인6.jpg' ,'메인7.jpg'], // 이미지 파일명 배열
      };
    },
    mounted() {
      setInterval(() => {
        this.changeSlide(1);
      }, this.slideInterval);
    },
    methods: {
      changeSlide(direction) {
        const slideCount = this.images.length;
        this.currentIndex = (this.currentIndex + direction + slideCount) % slideCount;
      }
    }
  };
</script>
  
<style scoped>
  /* 전체 캐러셀 컨테이너 스타일 */
  .carousel {
    width: 800px; /* 캐러셀 전체 너비 */
    margin: auto; /* 가운데 정렬을 위한 마진 설정 */
    margin-top: 50px;
    overflow: hidden; /* 넘치는 부분 숨김 처리 */
    position: relative; /* 상대적 위치 지정 */
  }
  /* 슬라이드 그룹 컨테이너 스타일 */
  .slides {
    display: flex;
    transition: transform 0.5s ease-in-out;  /*슬라이드 전환 속도 */
    width: 2400px; /* 슬라이드 전체 너비: 800px * 3 */
  }
  
 /* 각 슬라이드 요소 스타일 */
.slide {
  min-width: 800px; /* 최소 너비 지정 */
  box-sizing: border-box; /* 박스 크기 포함 */
  }
  
/* 슬라이드 이미지 스타일 */
.slide img {
  width: 800px; /* 이미지 너비 고정 */
  height: 400px; /* 이미지 높이 설정 */
  object-fit: cover; /* 이미지 비율 유지 */
}
  
  .prev, .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .prev {
    left: 0;
  }
  
  .next {
    right: 0;
  }
  .page-buttons {
  display: flex;
  justify-content: center;
  margin-top: 0px;
  font-size: 17px;
  font-weight: bold;
}
.page-button {
  width: 80px; /* 버튼 너비 */
  height: 80px; /* 버튼 높이 */
  background-color: rgba(0, 255, 89, 0.5);
  color: rgb(0, 0, 0);
  border-radius: 50%; /* 반지름을 버튼 너비/높이의 절반으로 설정하여 원형 만들기 */
  padding: 0;
  cursor: pointer;
  margin: 50px 50px;
  justify-content: center;
}
.page-button span{
  display: flex;
  justify-content: center;
}
.page-button img {
  width: 100%; /* 이미지 너비 100%로 설정 */
  height: 100%; /* 이미지 높이 100%로 설정 */
}
</style>
  