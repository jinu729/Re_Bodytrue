<template>
    <div class="trainer">
        <div class="logo">
            <img src="../image/banner.png">
                <div class="buttons">
                    <div class="button">
                        <button @click="goToAboutPage1">마이페이지</button>
                        <button @click="goToAboutPage2">프로그램 등록</button>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToAboutPage1() {
            this.$router.push('/trmypage');
        },

        goToAboutPage2() {
            this.$router.push('/trprocreate');
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
.logo img {
    width: 500px;
    /* height: 200px; */
    padding-top: 150px;
}

.buttons {
    /* display: flex; */
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
    margin: 100px auto;
}

.button {
    /* margin-top: 10px; */
    display: flex;
    justify-content: space-between;
}

.button button {
    border: none;
    color: white;
    background-color: #00C7AE;
    font-size: 30px;
    padding: 15px 30px;
    cursor: pointer;
    border-radius: 8px;
    width: 300px;
}
</style>