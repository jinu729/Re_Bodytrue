<template>
    
   <div class="goodsbox" style="display: flex; align-items: center;">
                                        <label class="form-label">메인 이미지 *</label>
                                        <input type="text" class="form-control" :value="fileName" placeholder="상품 이미지를 업로드 하세요" disabled>
                                        
                                        <div class="input-img">
                                            <label for="upload-file">파일선택<br></label>
                                            <input type="file" name="upload" id="upload-file"
                                                @change="uploadFile($event.target.files, 0)">
                                        </div>
                                    


                                    <div class="goodsbox">
                                        <label class="form-label">설명 이미지 *</label>
                                        <input type="text" class="form-control" :value="fileName2"
                                            placeholder="상품 상세 이미지를 업로드 하세요" disabled>
                                        <div class="input-img">
                                            <label for="upload-file2">파일선택<br>  </label>
                                            <input type="file" name="upload" id="upload-file2"
                                                @change="uploadFile2($event.target.files, 1)">
                                        </div>
                                    </div>
                                </div>
    

</template>
<script>
import axios from 'axios';

export default {
    data(){
        
    },
    mounted() {
        // 서버 테스트 라우트 호출
        axios.get('http://localhost:3000/test')
            .then(response => {
                console.log('Response from server:', response.data);
            })
            .catch(error => {
                console.error('Error connecting to the server:', error);
            });
    },
    method:{
        async uploadFile(file, type) {

            let name = "";
            if (file) {
                name = file[0].name;
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
                    url: `http://localhost:3000/goods/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                    .then((res) => {
                        if (res.data.message == 'success') {
                            if (type == 0) {
                                this.goods.goods_img = name;
                            }
                            else if (type == 1) {
                                this.goods.goods_content = name;
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
                    url: `http://localhost:3000/goods/upload_img`,
                    method: 'POST',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: formData
                })
                    .then((res) => {
                        if (res.data.message == 'success') {
                            if (type == 0) {
                                this.goods.goods_img = name;
                            }
                            else if (type == 1) {
                                this.goods.goods_content = name;
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

        }
    }
};

</script>


