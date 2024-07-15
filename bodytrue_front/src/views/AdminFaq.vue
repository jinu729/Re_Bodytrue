<template>
    <div class="admin_faq_main">
        <div class="admin_faq">FAQ 관리</div>
        <div class="admin_container">
            <div class="admin_faq_ans">
                <div class="admin_faq_question">
                    <div v-for="(faq, i) in paginatedFaqList" :key="faq.faq_no" class="faq_item">
                        <div class="question_box">
                            <div class="question">
                                {{ (currentPage - 1) * perPage + i + 1 }}.
                                <input type="text" v-if="faq.isEditingQuestion" v-model="faq.faq_q">
                                <span v-else>{{ faq.faq_q }}</span>
                            </div>
                            <div class="toggle_button">
                                <button class="admin_toggle_update" @click="toggleEditQuestion(faq)">✔</button>
                                <button class="admin_toggle_delete" @click="delFAQ(faq.faq_no)">❌</button>
                                <button class="show_toggle" v-if="activeFAQ !== faq.faq_no" @click="toggleAnswer(faq.faq_no)">▼</button>
                                <button class="hidden_toggle" v-else @click="toggleAnswer(null)">▲</button>
                            </div>
                        </div>
                        <div v-if="activeFAQ === faq.faq_no" class="answer_box">
                            ▶A{{ (currentPage - 1) * perPage + i + 1 }}.
                            <input type="text" v-if="faq.isEditingAnswer" v-model="faq.faq_a">
                            <span v-else>{{ faq.faq_a }}</span>
                            <button class="admin_toggle_update2" @click="toggleEditAnswer(faq)">✔</button>
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
            perPage: 10,
            activeFAQ: null,
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
                        isEditingQuestion: false,
                        isEditingAnswer: false,
                    }));
                })
                .catch(error => {
                    console.error('Error fetching faqlist:', error);
                });
        },
        async delFAQ(faq_no) {
            try {
                await axios.post('http://localhost:3000/admin/delfaq', { faq_no });
                this.$swal('FAQ 목록에서 삭제 되었습니다.');
                this.getfaqList();
            } catch (error) {
                console.error("FAQ 삭제 도중 에러 발생", error);
            }
        },
        toggleAnswer(faq_no) {
            if (this.activeFAQ === faq_no) {
                this.activeFAQ = null;
            } else {
                this.activeFAQ = faq_no;
            }
        },
        async toggleEditQuestion(faq) {
            if (faq.isEditingQuestion) {
                try {
                    await axios.post('http://localhost:3000/admin/updatefaq_q', {
                        Q: faq.faq_q,
                        faq_no: faq.faq_no
                    });
                    this.$swal('질문이 성공적으로 수정되었습니다.');
                    faq.isEditingQuestion = false;
                } catch (error) {
                    console.error('Error updating question:', error);
                }
            } else {
                faq.isEditingQuestion = true;
            }
        },
        async toggleEditAnswer(faq) {
            if (faq.isEditingAnswer) {
                try {
                    await axios.post('http://localhost:3000/admin/updatefaq_a', {
                        A: faq.faq_a,
                        faq_no: faq.faq_no
                    });
                    this.$swal('답변이 성공적으로 수정되었습니다.');
                    faq.isEditingAnswer = false;
                } catch (error) {
                    console.error('Error updating answer:', error);
                }
            } else {
                faq.isEditingAnswer = true;
            }
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
    width: 80%; /* 부모 요소가 이미 중앙 정렬되므로 100% 너비 사용 */
    margin: 0 auto;
    padding: 2px; /* 내부 패딩을 10px로 설정 */
    margin-top: 20px;
}


.admin_faq {
    background-color: #00C7AE; /* 배경색을 청록색으로 설정 */
    color: #fff; /* 텍스트 색상을 흰색으로 설정 */
    padding: 10px 10px; /* 상하 패딩 10px, 좌우 패딩 20px 설정 */
    font-weight: bold; /* 폰트를 굵게 설정 */
    font-size: 26px; /* 폰트 크기를 24px로 설정 */
    border-radius: 10px 10px 10px 10px; /* 상단 좌우 모서리를 둥글게 설정 */
    padding-left:20px;
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
    width:100%;
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
 .hidden_toggle {
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
    border: 1px solid rgb(229, 226, 226);
    margin-top: 30px;
}
.answer_box {
    padding: 10px;
    border-radius: 5px;
    margin-top: 15px;
    border: 1px solid rgb(229, 226, 226);
    font-size: 25px;
    font-weight: bold;
}
.question {
    width: 90%;
    font-size: 25px;
    font-weight: bold;
}
.toggle_button {
    float: right;
    margin-top: -35px;
}
.admin_toggle_update2 {
    float: right;
    padding: 3px 1px;
    cursor: pointer;
    font-size: 20px;
    background: none;
    border: none;
}
</style>