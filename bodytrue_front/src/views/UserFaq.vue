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
</template> -->
<template>
    <div class="faq_main">
        <h2><b><img style="width:50px; padding-right:10px; padding-bottom:20px;" src="../image/faq2icon.png">자주 묻는 질문</b></h2>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item" v-for="(faq, index) in faqlist" :key="index">
                <h2 class="accordion-header" :id="'heading' + index">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" :aria-expanded="index === 0 ? 'true' : 'false'" :aria-controls="'collapse' + index">
                        {{ faq.faq_q }}
                    </button>
                </h2>
                <div :id="'collapse' + index" class="accordion-collapse collapse" :class="{ show: index === 0 }" :aria-labelledby="'heading' + index" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <strong>{{ faq.faq_a }}</strong>
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
    width: 1280px;
    margin: 0 auto;
    padding-top:50px;
    position: relative;
    text-align: center;
    font-size: 40px;
}

/*아코디언*/
.accordion-header {
    padding-top:20px;
    margin:0 auto;
     width: 1280px;
}
.accordion-item {
    border:none;
}
.accordion-button.collapsed{
    margin:0 auto;
    width: 1280px;
    background-color: 	#00CED1;
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
    font-size:28px;
}
.accordion-button:not(.collapsed){
    background-color:#ffffff;
    color:#000000;
    border-radius: 5px;
    border: 1px solid #bbdcdf;
    box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
    font-size:28px;
}
.accordion-body{
    font-size:20px;
    width: 1280px;
    margin-top: 5px;
    border: 1px solid #bbdcdf;
    border-radius: 5px;
}
</style>