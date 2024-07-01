<template>
    <input type="file" accept="image/*" @change="uploadFile()"/>
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
        uploadfile:function(e) {
                console.log(e.target.files)//files는 배열로 들어온다.
                this.file = e.target.files[0];
        }
    }
};

</script>


