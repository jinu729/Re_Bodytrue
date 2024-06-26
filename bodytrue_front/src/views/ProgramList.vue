<template>
    <div>
        <div class="sort_right">&nbsp;&nbsp;
        <select name="sort1" id="sort1">
            <option value="조회순">조회순</option>
            <option value="평점순">평점순</option>
            <option value="마감순">마감순</option>
        </select>
    </div>
    <main class="prolist_main">
        <div class="prolist_list">
            <!-- Program Items -->
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름1 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름2 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름3 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름4 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름5 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름6 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름7 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
           
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름8 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름9 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            
            <div class="program_item">
                <div class="program_image">
                    <img id="proimage" src="../image/programlist/요가.png" >
                </div>
                <div class="program_details">
                    <p class="program_name">프로그램 이름10 <span class="rating">★ 4.8</span></p>
                    <p class="trainer_name">트레이너 이름</p>
                </div>
            </div>
            

        </div>
    </main>
    </div>
    
</template>
<script>
export default {
    data() {
        return {
            sampleData: ''
        };
    }
}
</script>

<style scoped>

/*programlist*/
.sort_right{
    width: 80%;
    height: 5%;
    margin: auto;
    padding-top: 30px;
    padding-right: 50px;
}

#sort1{
    float: right;
    font-size: 20px;
    width: 120px;
}

.prolist_main{
    width: 80%;
    margin: 0 auto;
}
.prolist_list{
    display: flex;
    padding-left: 120px;
    flex-wrap: wrap;
    object-fit: cover;
    margin: 0 auto;
}

.program_item{
    display: flex;
    flex-direction: row;
    
    flex-wrap: wrap;
    width: 256px;
    margin: 25px;
}

#proimage{
    width: 256px;
    height: 256px;
    object-fit: cover;
}


/*programdetail*/

.programdetailimg{
    padding: 20px;
    width: 600px;
    height: 600px;
}

/*패널사이 간격 조정*/
.main-content {
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    justify-content: center;
    
}

.left-panel {
    width: 90%; /* 3:1 비율로 설정 */
    padding: 20px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.right-panel {
    width: 20%;
    padding: 20px;
    border: 1px solid #525252;
    margin-left: 40px;
    height: fit-content;
    position: sticky;
    top: 20px;
}


/*이미지 슬라이드*/
.slider {
    position: relative;
    width: 800px;
    margin: auto;
    overflow: hidden; /*박스 밖에 안나가도록 조정*/
    height: 600px;
}

.slides {
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 800px;
}

.slide {
    min-width: 100%;
    box-sizing: border-box;
}

.slide img {
    width: 800px;
    height: 600px;
    object-fit: cover;
}

.prev, .next {
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: rgb(0, 0, 0);
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 3px;
    user-select: none;
    transform: translateY(-50%);
    background-color: transparent; /* 배경색 투명으로 설정 */
    cursor: pointer;
    border: none; /* 기본 버튼 스타일 제거 */
}

.prev {
    left: 0;
    border-radius: 0 3px 3px 0;
}

.next {
    right: 0;
    border-radius: 3px 0 0 3px;
}

/*태그*/
.tabs ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0;
    border-bottom: 1px solid #525252;
}
.tabs ul li {
    padding: 10px 0;
}

.tabs ul li a {
    text-decoration: none;
    color: #000;
}

/*캘린더*/
.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.calendar-header button {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
}

.days {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.day {
    flex: 1;
    text-align: center;
    padding: 5px;
    font-weight: bold;
    color: #555;
}

.dates {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.date {
    flex: 1;
    text-align: center;
    padding: 10px;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
}

.date.active {
    background-color: #00c8c8;
    color: #fff;
}

.times button {
    width: calc(33.333% - 10px);
    margin: 5px;
    padding: 10px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
}

/*예약버튼*/
.reserve-btn, .favorite-btn {
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
}

.reserve-btn {
    background-color: #00c8c8;
    color: #fff;
}

.favorite-btn {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #f00;
}

/*description*/
.description{
    padding-top:30px;
    padding-bottom: 50px;
    border-bottom: 1px solid #525252;
}

/*price-info*/
.price-info{
    padding-top:30px;
    padding-bottom: 50px;
    border-bottom: 1px solid #525252;
}

/*review*/
.review-main {
    width: 60%;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 30px;
    border-bottom: 1px solid #525252;
}

</style>