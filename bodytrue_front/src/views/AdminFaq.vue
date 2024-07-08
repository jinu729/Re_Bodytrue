<template>
    <div class="admin_faq_main">
        <div class="admin_faq">FAQ 관리</div>
        <div class="admin_container">
            <div class="admin_faq_ans">
                <div class="admin_faq_question">
                    <div class="admin_question" id="Q">
                        <div v-for="(faq, i) in paginatedFaqList" :key="i" class="faq_item">
                        <div class="question_box">
                            <div>Q{{ (currentPage - 1) * perPage + i + 1 }}. {{ faq.faq_q }}</div>
                            <button class="admin_toggle_update">✔</button>
                            <button class="admin_toggle_delete" @click="delFAQ(faq.faq_no)">❌</button>
                            <button class="show_toggle" v-if="!faq.visible" @click="toggleAnswer(faq)">▼</button>
                            <button v-else @click="toggleAnswer(faq)">▲</button>
                        </div>
                        <div v-if="faq.visible" class="answer_box">
                            ▶A{{ (currentPage - 1) * perPage + i + 1 }}. {{ faq.faq_a }}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <ul class="admin_page">
                <li v-for="page in totalPages" :key="page">
                    <a href="#" @click.prevent="gotoPage(page)" :class="{ active: page === currentPage }">
                        {{ page }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

  
  <script>
  import axios from 'axios';
  
  export default {
      data() {
          return {
              faqList: [],
              currentPage: 1,
              perPage: 10, // 페이지 당 아이템 수
          };
      },
      computed: {
          paginatedFaqList() {
              const start = (this.currentPage - 1) * this.perPage;
              const end = start + this.perPage;
              return this.faqList.slice(start, end);
          },
          totalPages() {
              return Math.ceil(this.faqList.length / this.perPage);
          }
      },
      methods: {
          getfaqList() {
              axios.get('http://localhost:3000/admin/faqlist')
                  .then(response => {
                      this.faqList = response.data.map(faq => ({
                          ...faq,
                          visible: false // Initialize visibility state for each FAQ
                      }));
                  })
                  .catch(error => {
                      console.error('Error fetching faqlist:', error);
                  });
          },
          async delFAQ(faq_no) {
              try {
                  await axios.post('http://localhost:3000/admin/delfaq', { faq_no });
                  alert('FAQ 목록에서 삭제 되었습니다.');
                  this.getfaqList(); // 삭제 후 목록 다시 불러오기
              } catch (error) {
                  console.error("FAQ 삭제 도중 에러 발생", error);
              }
          },
          toggleAnswer(faq) {
              faq.visible = !faq.visible; // Toggle the visibility state
          },
          gotoPage(page) {
              if (page > 0 && page <= this.totalPages) {
                  this.currentPage = page;
              }
          }
      },
      mounted() {
          this.getfaqList();
      }
  };
  </script>
  

<style scoped>
.admin_faq_main {
    width: 100%;
}

.admin_faq {
    text-align: left;
    font-size: 35px;
    border: 1px;
    background-color: #00C7AE ;
    color: white;
    padding-left: 3%;
    height: 60px;
}
.admin_container {
    width: 80%;
    padding-top: 30px;
    margin: 0 auto;
}
.admin_faq_ans {
    width: 100%;
    margin: 40px auto;
}
.admin_question {
    padding: 15px;
    /* cursor: pointer; */
    align-items: center;
    border: 1px solid rgb(229, 226, 226);
    margin: 20px auto;
    font-size: 25px;
    width: 60%;
}
.admin_btn_box {
    float: right;
}
.admin_toggle_answer {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
}
.admin_toggle_update {
    padding: 3px 1px;
    cursor: pointer;
    font-size: 20px;
    background: none;
    border: none;
 }
 .admin_toggle_delete {
    padding: 3px 1px;
    cursor: pointer;
    font-size: 16px;
    background: none;
    border: none;
 }
 .show_toggle {
    padding: 3px 1px;
    cursor: pointer;
    font-size: 16px;
    background: none;
    border: none;
 }
 .admin_answer {
    padding: 15px;
    /* cursor: pointer; */
    align-items: center;
    border: 1px solid rgb(229, 226, 226);
    margin: 20px auto;
    font-size: 23px;
    width: 60%;
 }
 .admin_page {
    display: flex;
    gap: 10px;
    list-style: none;
    padding: 0;
    justify-content: center;
}
.admin_page li {
    display: inline;
}
.admin_page a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: #000;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}
.admin_page a.active {
    background-color: #00bfa5;
    color: white;
}
.admin_page a:hover {
    background-color: #ddd;
}
.question_box{
    padding: 10px;
    border-radius: 5px;
    
}

.answer_box {
    padding: 10px;
    border-radius: 5px;
}
</style>