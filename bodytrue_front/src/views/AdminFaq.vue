<template>
    <div class="admin_faq_main">
        <div class="admin_faq">FAQ 관리</div>
        <div class="admin_container">
            <div class="admin_faq_ans">
                <div class="admin_faq_question">
                    <div class="admin_question" id = "Q">
                        <tr v-for="(faqq, i) in qList" :key="i">
                            <td>{{ faqq.faq_q }}</td>
                        </tr>
                </div>
                </div>
                <div class="admin_answer" id = "A">
                    <tr v-for="(faqa, i) in aList" :key="i">
                            <td>{{ faqa.faq_a }}</td>
                        </tr>
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
            qList: [],
            aList: [],
            currentPage: 1,
            perPage: 10, // 페이지 당 아이템 수
        };
    },
    computed: {
        paginatedQList() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.qList.slice(start, end);
        },
        paginatedAList() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.aList.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.qList.length / this.perPage);
        }
    },
    methods: {
        getqList() {
            axios.get('http://localhost:3000/admin/qlist')
                .then(response => {
                    this.qList = response.data;
                })
                .catch(error => {
                    console.error('Error fetching q list:', error);
                });
        },
        getaList() {
            axios.get('http://localhost:3000/admin/alist')
                .then(response => {
                    this.aList = response.data;
                })
                .catch(error => {
                    console.error('Error fetching a list:', error);
                });
        },
        gotoPage(page) {
            this.currentPage = page;
        }
    },
    mounted() {
        this.getqList();
        this.getaList();
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