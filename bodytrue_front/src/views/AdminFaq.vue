<template>
    <div class="admin_faq_main">
        <div class="admin_faq">FAQ 관리</div>
        <div class="admin_container">
            <div class="admin_faq_ans">
                <div class="admin_faq_question">
                    <div class="admin_question" id = "Q">
                        <div v-for="(faq, i) in faqList" :key="i">
                            <div>Q{{ (currentPage - 1) * perPage + i + 1 }}. {{ faq.faq_q }}</div>
                            <button class="admin_toggle_update">✔</button>
                            <button @click="delFAQ(faq.faq_no)">❌</button>
                            <!-- <button v-if="" class="admin_toggle_update">▼</button> -->
                            <div>▶A{{ (currentPage - 1) * perPage + i + 1 }}. {{ faq.faq_a }}</div>
                            <button class="admin_toggle_update">✔</button>
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
// import Swal from 'sweetalert2';

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
            console.log('faqList length:', this.faqList.length);
            console.log('start:', start, 'end:', end);
            return this.faqList.slice(start, end);
        },
        totalPages() {
        const pages = Math.ceil(this.faqList.length / this.perPage);
        console.log('totalPages:', pages);
        return pages;
    }
    },
    methods: {
        getfaqList() {
            axios.get('http://localhost:3000/admin/faqlist')
                .then(response => {
                    this.faqList = response.data;

                    // for(i=0; i < 10; i++){
                    //     faqList[i].hidden = false;
                    // }

                })
                .catch(error => {
                    console.error('Error fetching faqlist:', error);
                });
        },
        async delfaq(faq_no){
            console.log("faq_no",faq_no);
            try{
                const response = await axios.post(`http://localhost:3000/admin/delfaq`, {faq_no: faq_no});
                console.log("리뷰 삭제 성공", response.data);
                alert('faq 목록에서 삭제 되었습니다.');
            } catch(error){
                console.error("faq 삭제 도중 에러 발생",error);
            }
        },
        // delFAQ() {
        //     axios({
        //         url: 'http://localhost:3000/admin/delFAQ',
        //         method: 'POST',
        //         data: {
        //             faq_no: this.faq_no
        //         }
        //     })
        //     .then(res => {
        //         if (res.data.message === 'faq 삭제') {
        //             Swal.fire('faq가 삭제되었습니다.');
        //             this.getfaqList(); //삭제 후 목록 다시 불러오기
        //         }
        //     })
        //     .catch((error) => {
        //         console.log("삭제 메소드 오류:", error);
        //         Swal.fire('에러', 'faq 삭제 중 오류가 발생했습니다.', 'error');
        //     });
        },
        gotoPage(page) {
        if (page > 0 && page <= this.totalPages) {
            this.currentPage = page;
            console.log('Navigated to page:', page);
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
.admin_faqlist-bodypaging{
    padding-top: 15px;
}
</style>