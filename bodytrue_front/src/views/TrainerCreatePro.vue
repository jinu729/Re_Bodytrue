<template>
    <div class="prc_main">
        <div class="prc_title">
            <p>프로그램 등록</p>
        </div>
        <div class="prc_content">
                <!-- <form> -->
            <div class="content_left">
                <div class="upload_img">
                    <div class="img-box">
                        <img id="profile-picture" class="profile-picture" src="" alt="Profile Picture">
                    </div>
                    <input type="file" id="image-upload" accept="image/*" ref="img" @change="uploadFile($event.target.files, 0)">
                    <label for="image-upload" class="file-upload-label" style="padding-left: 50px;">썸네일이미지 선택</label><br>   
                    <span>사이즈(256 * 256)이내</span>
                </div>
            </div>
            <div class="content_right">
                <div class="prc_name">
                    <div class="prcn_title">
                        <span>프로그램 명</span>
                    </div>
                    <input type="text" id="prcn_text" v-model="program.prcn_text" placeholder="프로그램 명">
                </div>
                <div class="prc_name">
                    <div class="prcn_title">
                        <span>전화번호</span>
                    </div>
                    <input type="text" id="phn_text" v-model="program.phn_text" placeholder="010-1111-1111">
                </div>
                <div class="prc_name">
                    <div class="prcn_title">
                        <span>주소</span>
                    </div>
                    <input type="submit" id="address_text" v-model="program.adddress_text" value="주소">
                </div>
                <div class="prc_name">
                    <div class="prc_date">
                        <div class="prcn_title">
                            <span>시작일</span>
                        </div>
                        <input type="date" id="start_date" v-model="program.start_date" value="달력">
                    </div>
                    <div class="prc_date">
                        <div class="prcn_title">
                            <span>마감일</span>
                        </div>
                        <input type="date" id="end_date"  v-model="program.end_date" value="달력">
                    </div>
                </div>
                <div class="prc_detail prc_tag">
                    <div class="detail_title detail_tag">
                        <span>상세 설명</span>
                        <div class="tags">
                            <label for="diet">
                                <input type="radio" id="diet" name="tag" v-model="program.tags" value=0><span>다이어트</span>
                            </label>
                            <label for="bodychange">
                                <input type="radio" id="bodychange" name="tag" v-model="program.tags" value=1><span>체형교정</span>
                            </label>
                            <label for="tournament">
                                <input type="radio" id="tournament" name="tag" v-model="program.tags" value=2><span>대회</span>
                            </label>
                            <label for="strength">
                                <input type="radio" id="strength" name="tag" v-model="program.tags" value=3><span>체력증진</span>
                            </label>
                            <label for="hometraining">
                                <input type="radio" id=" hometraining" name="tag" v-model="program.tags" value=4><span>홈트</span>
                            </label>
                        </div>
                    </div>
                    <div class="img_upload">
                        <div class="img_content">
                            <span>상세 이미지 - 1</span>
                        </div>
                        <input type="file" class="prcimg_upload" id="file-input1" accept="image/png, image/jpeg" ref="img" @change="uploadFile2($event.target.files, 1)">                        
                    </div>
                    <div class="preview-container" id="preview-container"></div>
                    <div class="img_textarea">
                        <textarea name="img_textarea" id="img_textarea1" v-model="program.img_textarea1" placeholder="상세 이미지 설명"></textarea>
                    </div>
                </div>
                <div class="prc_detail">
                    <div class="img_upload">
                        <div class="img_content">
                            <span>상세 이미지 - 2</span>
                        </div>
                        <input type="file" class="prcimg_upload" id="file-input2" accept="image/png, image/jpeg" ref="img" @change="uploadFile3($event.target.files, 2)">
                    </div>
                    <div class="preview-container" id="preview-container2"></div>
                    <div class="img_textarea">
                        <textarea name="img_textarea" id="img_textarea2"  v-model="program.img_textarea2" placeholder="상세 이미지 설명"></textarea>
                    </div>
                </div>
                <div class="prc_price">
                    <div class="img_title">
                        <span>가격</span>
                    </div>
                    <div class="img_upload">
                        <div class="img_content">
                            <span>가격</span>
                        </div>
                        <input type="file" class="prcimg_upload" id="file-input3" accept="image/png, image/jpeg" ref="img" @change="uploadFile4($event.target.files, 3)">
                    </div>
                    <div class="preview-container" id="preview-container3"></div>
                </div>
            </div>
                <!-- </form> -->
        </div>
        <div class="prc_btn">
            <button type="submit" name="create" id="prc_create" @click="ProInsert">등록</button>
            <button type="button" name="cancle" id="prc_cancel">취소</button>
        </div>
    </div>    
</template>
<script>

//사악하디 사악한 숭메마녀에게 저주를 받아버린 뷰에요!! 어느 용기있는 용자가와서 이 저주받은 뷰를 해방시켜줄거에요!

import axios from 'axios';

export default {
    data(){
        return {
            fileName:"",
            fileName2:"",
            fileName3:"",
            fileName4:"",
            program:{
                prcn_text:"",
                // phn_text:"",
                // adddress_text:"",
                start_date:"",
                end_date:"",
                img_textarea1:"",
                img_textarea2:"",
                tags:"",

                pro_img:"",
                pro_img1:"",
                pro_img2:"",
                pro_imgprice:"",
                tr_no: '',
            },
            tr_no : localStorage.tr_no,
        }

    },
     computed: {
      trainer(){
        return this.$store.state.trainer;
      },
     },

    methods:{
        async uploadFile(file, type) {

            let name = "";
            if (file) {
                name = file[0].name;
                // console.log("name",name);
            }
            else {
                return;     // 파일 미선택 시 반환
            }

            const formData = new FormData();

            formData.append('img', file[0]);
            this.fileName = file ? file[0].name : '이미지를 업로드 하세요';

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            try {
                axios({
                    url: `http://localhost:3000/trainer/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                    
                })
                    .then((res) => {
                        if (res.data.message == 'success') {
                            if (type == 0) {
                                this.program.pro_img = name;
                                console.log("0",this.program.pro_img);
                            }
                            else if (type == 1) {
                                this.program.pro_img1 = name;
                                console.log("1",this.program.pro_img1);
                            }
                            else if (type == 2) {
                                this.program.pro_img2 = name;
                                console.log("2",this.program.pro_img2);
                            }
                            else if (type == 3) {
                                this.program.pro_imgprice = name;
                                console.log("price",this.program.pro_imgprice);
                            }
                        }
                        else {
                            this.$swal("DB 에러");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                return true;

            } catch (err) {
                console.log(err);
                return false;
            }

        },
        async uploadFile2(file, type) {

            let name = "";
            if (file) {
                name = file[0].name;
                console.log("name",name);
            }
            else {
                return;     // 파일 미선택 시 반환
            }

            const formData = new FormData();

            formData.append('img', file[0]);
            this.fileName2 = file ? file[0].name : '이미지를 업로드 하세요';

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            try {
                axios({
                    url: `http://localhost:3000/trainer/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                    .then((res) => {
                        if (res.data.message == 'success') {
                            if (type == 0) {
                                this.program.pro_img = name;
                                console.log("0",this.program.pro_img);
                            }
                            else if (type == 1) {
                                this.program.pro_img1 = name;
                                console.log("1",this.program.pro_img1);
                            }
                            else if (type == 2) {
                                this.program.pro_img2 = name;
                                console.log("2",this.program.pro_img2);
                            }
                            else if (type == 3) {
                                this.program.pro_imgprice = name;
                                console.log("proce",this.program.pro_imgprice);
                            }
                        }
                        else {
                            this.$swal("DB 에러");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                return true;

            } catch (err) {
                console.log(err);
                return false;
            }

        },async uploadFile3(file, type) {

            let name = "";
            if (file) {
                name = file[0].name;
            }
            else {
                return;     // 파일 미선택 시 반환
            }

            const formData = new FormData();

            formData.append('img', file[0]);
            this.fileName3 = file ? file[0].name : '이미지를 업로드 하세요';

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            try {
                axios({
                    url: `http://localhost:3000/trainer/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                    .then((res) => {
                       if (res.data.message == 'success') {
                            if (type == 0) {
                                this.program.pro_img = name;
                                console.log("0",this.program.pro_img);
                            }
                            else if (type == 1) {
                                this.program.pro_img1 = name;
                                console.log("1",this.program.pro_img1);
                            }
                            else if (type == 2) {
                                this.program.pro_img2 = name;
                                console.log("2",this.program.pro_img2);
                            }
                            else if (type == 3) {
                                this.program.pro_imgprice = name;
                                console.log("proce",this.program.pro_imgprice);
                            }
                        }
                        else {
                            this.$swal("DB 에러");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                return true;

            } catch (err) {
                console.log(err);
                return false;
            }

        },async uploadFile4(file, type) {

            let name = "";
            if (file) {
                name = file[0].name;
            }
            else {
                return;     // 파일 미선택 시 반환
            }

            const formData = new FormData();

            formData.append('img', file[0]);
            this.fileName4 = file ? file[0].name : '이미지를 업로드 하세요';

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }

            try {
                axios({
                    url:`http://localhost:3000/trainer/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                    .then((res) => {
                        if (res.data.message == 'success') {
                            if (type == 0) {
                                this.program.pro_img = name;
                                console.log("0",this.program.pro_img);
                            }
                            else if (type == 1) {
                                this.program.pro_img1 = name;
                                console.log("1",this.program.pro_img1);
                            }
                            else if (type == 2) {
                                this.program.pro_img2 = name;
                                console.log("2",this.program.pro_img2);
                            }
                            else if (type == 3) {
                                this.program.pro_imgprice = name;
                                console.log("price",this.program.pro_imgprice);
                            }
                        }
                        else {
                            this.$swal("DB 에러");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                return true;

            } catch (err) {
                console.log(err);
                return false;
            }

        },
        ProInsert() {
            console.log("program",this.program);
            const tr_no = this.$route.params.tr_no;
                axios({
                    url: `http://localhost:3000/trainer/createprogram/${tr_no}`,
                    method: "POST",
                    data: {     
                        prcn_text: this.program.prcn_text,
                        // phn_text:"트레이너번호",
                        // adddress_text:this.program.p,
                        start_date:this.program.start_date,
                        end_date:this.program.end_date,
                        img_textarea1:this.program.img_textarea1,
                        img_textarea2:this.program.img_textarea2,
                        tags:this.program.tags,
                        
                        pro_img:this.program.pro_img,
                        pro_img1:this.program.pro_img1,
                        pro_img2:this.program.pro_img2,
                        pro_imgprice:this.program.pro_imgprice
                    },
                })
                    
                    .then((res) => {
                        if (res.data.message == 'add_complete') {
                            this.$swal({
                                position: 'top',
                                icon: 'success',
                                title: '상품 등록 성공!',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            
                                .then(() => {
                                    window.location.href = "http://localhost:8081/admin/goodsList";
                                })
                        console.log("data",this.prcn_text);        
                        } else if (res.data.message == 'already_exist_goods') {
                            this.$swal("이미 등록된 상품입니다.");
                        }
                        else if (res.data.message == '파일 변경 실패') {
                            this.$swal("파일 변경 실패");
                        }
                        else {
                            this.$swal("상품 등록 실패");
                            console.log("data",this.prcn_text);
                        }
                    })
                    .catch(() => {
                        this.$swal("오류 발생")
                    })
            }
        },
          
    
}
</script>
<style scoped>


*{
    margin: 0;
    padding: 0;
}
ul{list-style: none;}
a:link, a:visited{
    text-decoration: none;
    color: #333;
}
html, body{
    width: 100%;
    /* height: 100%; */
}
body{
    background-color: #fff;
    min-width: 1280px;
    line-height: 1.5;
}   

/* header */
header{
    width: 100%;
    height: 80px;
    /* background-color: gray; */
    position: relative;
    border-bottom: 1.5px solid black;
}
header .wrap{
    width: 80%;
    height: 80px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
header .nav_left{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 7;
}
header .nav_left h1{
    width: 180px;
    height: 55px;
}
header .logo img{
    height: 60px;
    line-height: 60px;
}
header .nav_right{
    display: flex;
    align-items: end;
    justify-content: flex-start;
    z-index: 7;
}
.nav_right .icon_list{
    width: 90px;
}
.icon_list .item{
    line-height: 35px;
    font-size: 18px;
    font-weight: bold;
}
.item .icon img{
    width: 18px;
    height: 18px;
    /* padding-top: 1px; */
}

/* prc_main */
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