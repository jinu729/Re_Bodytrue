<template>
    <div class="admin">
        <div class="logo">
            <img src="../image/banner.png">
                <div class="buttons">
                    <div class="button">
                        <button @click="adminuser">회원 관리</button>
                        <button @click="admintrainer">트레이너 관리</button>
                    </div>
                    <div class="button">
                        <button @click="adminfaq">FAQ 관리</button>
                        <button @click="adminreview">리뷰관리</button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        adminuser() {
            this.$router.push('/admin/userlist');
        },

        admintrainer() {
            this.$router.push('/admin/trainerlist');
        },

        adminfaq() {
            this.$router.push('/adminfaq');
        },

        adminreview() {
            this.$router.push('/adminreview');
        }
    }
};
</script>

<style scoped>
/* scoped 스타일 - 이 컴포넌트 내에서만 적용됨 */
.trainer_mainpage {
    text-align: center;
}
.logo {
    text-align: center;
}

.logo img{
    width: 500px;
    text-align: center;
    padding-top: 150px;
}
.admin_mainpage {
    text-align: center;
}
.admin_buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
    margin: 0 auto;
}
button {
    border: none ;
    color: white;
    background-color: #00C7AE;
    font-size: 30px;
    padding: 15px 30px;
    cursor: pointer;
    border-radius: 8px;
    width: 300px;
    margin-top: 50px;
    
}
button + button {
    margin-left: 100px;
}
</style>