<template>
    <div class="prc_main">
        <div class="prc_title">
            <p>리뷰 관리</p>
        </div>
        <div class="prc_name">
            <div class="prcn_title">
                <span>프로그램 명</span>
            </div>
            <p>{{ proTitle }}</p>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            proTitle: ''
        };
    },
    methods: {
        getProTitle() {
            axios.get('http://localhost:3000/admin/protitle')
            .then(response => {
                // 백엔드에서 여러 개의 프로그램이 반환될 경우 첫 번째 프로그램의 이름만 사용
                if (response.data.length > 0) {
                    this.proTitle = response.data[0].pro_name;
                } else {
                    this.proTitle = 'No program found';
                }
            })
            .catch(error => {
                console.error('Error fetching protitle:', error);
            });
        }
    },
    mounted() {
        this.getProTitle();
    }
}
</script>


<style scoped>
.prc_main{
    width: 80%;
    /* height: 100%; */
    margin: 0 auto;
    padding-top: 10px;
    /* background-color: aqua; */
}
.prc_main .prc_title{
    width: 100%;
    height: 50px;
    background-color: #00C7AE;
}
.prc_title p{
    font-size: 20px;
    line-height: 50px;
    padding-left: 20px;
    color: white;
}
.prc_main .prc_content{
    width: 100%;
    margin-top: 20px;
    background-color: white;
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    box-shadow: 4px 4px 5px rgba(0, 199, 174, 0.5);
}

/* content_left */
.prc_content .content_left{
    width: 20%;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 10px;
}
.content_left .upload_img{
    width: 100%;
}
.content_left .upload_img span{
    padding-left: 40px;
}
.content_left .upload_img .img-box{
    width: 250px;
    height: 250px;
    border: 2px solid #ccc;
    overflow: hidden;
    display: inline-block;
    position: relative;    
}
.content_left .upload_img .profile-picture{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

/* content_right */
.prc_content .content_right{
    width: 74%;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 20px;
}
.content_right .prc_name{
    width: 100%;
    /* border: 1px solid #ccc;     */
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
    border-radius: 5px;
}
.prc_name .prcn_title{
    width: 150px;
    height: 30px;
    text-align: left;
    margin: 5px;
    margin-left: 10px;
}
.prc_name .prcn_title span{
    line-height: 37px;
    font-size: 22px;
}
#prcn_text{
    width: 750px;
    height: 35px;
    margin: 5px;
    margin-right: 10px;
    text-align: center;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
#phn_text{
    width: 750px;
    height: 35px;
    margin: 5px;
    margin-right: 10px;
    text-align: center;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
#address_text{
    width: 750px;
    height: 35px;
    margin: 5px;
    margin-right: 10px;
    text-align: center;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.content_right .prc_name:nth-child(4){
    box-shadow: 0 0 0 0;
}
.content_right .prc_name .prc_date{
    width: 47%;
    border: 0 1px 1px 0 solid #ccc;    
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    display: flex;
    flex-wrap: wrap;
    /* margin-top: 15px; */
}
.prc_name .prc_date .prcn_title{
    width: 150px;
    height: 30px;
    text-align: left;
    margin: 5px;
    margin-left: 10px;
}
#start_date, #end_date{
    width: 230px;
    height: 35px;
    margin: 5px;
    margin-right: 10px;
    text-align: center;
    font-size: 20px;
}
.prc_name .prc_date:nth-child(2){
    margin-left: 56px;
}
.content_right .prc_detail{
    padding-top: 20px;
    margin-left: 10px;
}
.prc_detail .detail_title span{
    font-size: 22px;
}

/* tag */
.prc_tag .detail_tag{
    display: flex;
    justify-content: space-between;
}
.prc_tag .detail_tag .tags {
    display: flex;
}

.prc_tag .detail_tag .tags label {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.prc_tag .detail_tag .tags input[type="checkbox"] {
    margin-right: 10px;
}
.prc_tag .detail_tag .tags span{
    font-size: 16px;
    padding-right: 10px;
}


/* img upload */
.content_right .prc_detail ,.prc_price{
    padding-top: 20px;
    margin-left: 10px;
}
.prc_price .img_title span{
    font-size: 22px;
}
.prc_price .img_upload{
    width: 950px;
    height: 40px;
    /* border: 1px solid black; */
    display: flex;
    line-height: 40px;
    margin-top: 10px;
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    border-radius: 5px;
}
.prc_detail .img_upload{
    width: 950px;
    height: 40px;
    /* border: 1px solid black; */
    display: flex;
    line-height: 40px;
    margin-top: 10px;
    box-shadow: 2px 2px 5px rgba(0, 199, 174, 0.5);
    border-radius: 5px;
}

.prc_detail .preview-container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.prc_detail .preview-container img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 2px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    margin: 14px;
}

.prc_price .preview-container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.prc_price .preview-container img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 2px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    margin: 14px;
}
.prc_detail .preview-container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.prc_detail .preview-container img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 2px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    margin: 14px;
}


/* img 공통 */
.img_upload .img_content{
    width: 150px;
    padding-left: 10px;
}   
.img_upload .prcimg_upload{
    line-height: 40px;
    width: 700px;
}
#img_textarea{
    width: 940px;
    height: 150px;
    font-size: 18px;    
    margin-top: 15px;
    padding-left: 10px;
    padding-top: 10px;
    resize: none;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* 등록 취소 버튼 */
.prc_main .prc_btn{
    width: 100%;
    margin-top: 50px;
    height: 80px;
    text-align: center;
}
#prc_create{
    width: 80px;
    height: 30px;
    background-color: #00C7AE ;
    border: 0;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    margin-right: 10px;
}
#prc_cancel{
    width: 80px;
    height: 30px;
    background-color: #ccc;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
}
</style>