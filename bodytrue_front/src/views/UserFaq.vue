<!-- <template>  
<div>
    <div class="faq_main">
        <h2><b>? 자주 묻는 질문</b></h2>
    </div>
    <div class="faq-box">
        <div class="faq-item">
            <div v-for="faq in faqlist" :key="faq.faq_no">
                <div class="question">
                    {{ faq.faq_q }}
                    <button class="toggle-answer">▼</button>
                </div>
                <div class="answer"> ▶ {{faq.faq_a}}</div>
            </div>    
        </div>
    </div>
</div>
</template> -->
<template>
<div>
    <div class="faq_main">
        <h2><b><img style="width:50px; margin-right: 15px; margin-bottom: 15px;" src="../image/faq2icon.png">자주 묻는 질문</b></h2>
    </div>
    <div class="faq-box" id="accordionExample">
        <div v-for="faq in faqlist" :key="faq.faq_no">
            <div class="faq-item">
                <h2 class="accordion-header" id="headingOne">
                <button class="question" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {{ faq.faq_q }}
                </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="answer">
                        <strong> {{faq.faq_a}}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            faqlist:[]
        }
    },
    created(){
        this.userfaq();
    },

    methods:{
        async userfaq(){
            axios.post(`http://localhost:3000/user/userfaq`)
            .then(res => {
                this.faqlist = res.data;
                console.log("faqlist", this.faqlist);
            })
            .catch(error =>{
                console.error('faq리스트 불러오는 도중 오류 발생',error);
            });
        }
    }

    
}
</script>

<style scoped>

.faq_main {
    margin: 40px;
    position: relative;
    text-align: center;
    font-size: 40px;
}

 .button{
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
}
.faq-box {
    /* margin-top: 20px; */
    border: 1px;
    border-radius: 8px;
    /* width: 10px 10px 10px 10px; */
    width: 800px;
    margin: 0 auto;
}

.faq-item {
    border: 1px solid white;
    border-radius: 5px;
    margin-bottom: 10px;
    overflow: hidden;
}

.question {
    background-color: white;
    padding: 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 10px 10px 10px 10px;
    border: 1px solid rgb(190, 190, 190);
}

.question:hover {
    background-color: white;
}
.toggle-answer {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
}
 .answer {
    margin-top: 20px;
    border: 1px solid rgb(190, 190, 190);
    /* border-radius: 8px; */
    width: 10px 10px 10px 10px;
    padding: 15px;
    /* margin: 0 auto; */
 }
</style>