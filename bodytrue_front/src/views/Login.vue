<template>
    <body>
    <!-- <div class="popup"></div>
    <div class="popup-content"></div> -->

    <center><h1>로그인</h1></center>
<div class="line-center"></div>
<div class="login-container">
        <div class="form_left">
        </div>
        <div class="form_right">
            <input type="radio" id="men" name="user_jender">개인 &nbsp;&nbsp;
            <input type="radio" id="women" name="user_jender"> 트레이너
        </div>                        
    <form action="">
        <div class="form-group">
            <label for="username">아이디</label>
            <div class="input-with-icon">
                <input type="text" id="username" name="username" placeholder="Username">
            </div>
        </div>
        <div class="form-group">
            <label for="username">비밀번호</label>
            <div class="input-with-icon">
                <input type="text" id="username" name="username" placeholder="Password">
            </div>
        </div>
        <div class="form-group forgot-password">
            <a onclick="openPopup('/bodytrue_findId.html')">아이디 찾기</a>
            <span>|</span>
            <a onclick="openPopup('/bodytrue_findPw.html')">비밀번호 찾기</a>
        </div>
        <div class="form-group save-id-checkbox">
            <span>
                <input type="checkbox" name="save_id" > 아이디 저장
            </span>
        </div>
        <div class="form-group">
            <a href="#" class="login-button" onclick="openPopup('../popup/login.html')">로그인</a>
        </div>
        <div class="form-group">
            <button type="submit">회원가입</button>
        </div>
        <br>
        <br>

        <center><h1>SNS 로그인</h1></center>
        <div class="line-center"></div>
        <br>
        <form action="">
            <div class="form-group">
                <button id="special2-button" class="button" type="submit" href="#" >카카오 로그인</button>
            </div>
            <div class="form-group">
                <button id="special-button" class="button" type="submit" href="#" >네이버 로그인</button>
            </div>
        </form>
    </form>
    <div>
        <button class="close" onclick="closePopup()">취소</button>
    </div>
</div>
</body>
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
/* 전반적인 페이지 스타일 */
body {
    font-family: Arial, sans-serif; /* 전체 페이지의 폰트 설정 */
    background-color: #f5f5f5; /* 배경색 설정 */
    
}
.popup-overlay {
    display: none;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    overflow: auto;
}

.popup {
    background-color: #fefefe;
    margin: 0% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    position: relative;
}

.close {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px; /* 하단에 배치 */
    font-size: 20px;
    cursor: pointer;
    color: #202627; /* 색상 변경 */
    border: none;
    background: none;

}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
.line-center {
    max-width: 638px;
    margin: 10px auto;
    margin-bottom: 1px;
    height: 2px;
    background-color: #ccc;

}
/* 로그인 폼을 감싸는 컨테이너 스타일 */
.login-container {
    max-width: 600px; /* 최대 너비 설정 */
    height: 800px;
    margin: 20px auto; /* 가운데 정렬을 위한 마진 설정 */
    background: #fff; /* 배경색 설정 */
    padding: 20px; /* 안쪽 여백 설정 */
    border-radius: 8px; /* 테두리 반경 설정 */
    box-shadow: 0 0 10px rgba(0,0,0,0.1); /* 그림자 효과 설정 */
}

/* 로그인 폼 제목 스타일 */
.login-container h2 {
    font-size: 24px; /* 폰트 크기 설정 */
    text-align: center; /* 가운데 정렬 */
    margin-bottom: 20px; /* 아래 여백 설정 */
}

/* 입력 필드와 버튼을 포함하는 그룹 스타일 */
.form-group {
    margin-bottom: 20px; /* 아래 여백 설정 */
}

/* 입력 필드 레이블 스타일 */
.form-group label {
    font-weight: bold; /* 폰트 굵기 설정 */
    display: block; /* 블록 요소로 표시 */
    margin-bottom: 5px; /* 아래 여백 설정 */
}

/* 텍스트 입력 필드 스타일 */
.form-group input[type="id"],
.form-group input[type="password"] {
    width: 100%; /* 너비 100% 설정 */
    padding: 10px; /* 안쪽 여백 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    box-sizing: border-box; /* 요소의 전체 너비에 패딩 및 테두리를 포함하도록 설정 */
    font-size: 16px; /* 폰트 크기 설정 */
}
/* 라디오 버튼 스타일 */
.form_right input[type="radio"] {
    width: 20px; /* 라디오 버튼의 가로 크기 */
    height: 20px; /* 라디오 버튼의 세로 크기 */
    border-radius: 50%; /* 원형 모양으로 설정 */
    border: 2px solid #007bff; /* 테두리 스타일 및 색상 설정 */
    outline: none; /* 포커스 상태에서의 외곽선 제거 */
    cursor: pointer; /* 마우스 커서 모양 설정 */
    margin-right: 10px; /* 라디오 버튼 사이의 간격 설정 */
}
.form-group a.login-button {
    background-color: #00C7AE;
    color: rgb(255, 255, 255);
    border: none;
    height: 50px;
    font-weight: bold; /* 폰트 굵기 설정 */
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    text-align: center; /* 텍스트 가운데 정렬 */
    display: block; /* 인라인 요소를 블록 요소로 변환하여 전체 너비를 차지하도록 설정 */
    margin-top: 10px;
    margin-bottom: 10px;
    text-decoration: none; /* 링크 기본 스타일 제거 */
    line-height: 45px;
}

.form-group a.login-button:hover {
    background-color: #0056b3;
    color: #fff;
}

.form_right{
    
    text-align: center;
    font-size: 25px;
    height: 40px;
}
.form_right input[type="radio"]:checked {
    background-color: #007bff; /* 선택된 라디오 버튼의 배경색 설정 */
}
/* 로그인 버튼 스타일 */
.form-group button {
    background-color: #00C7AE ; /* 배경색 설정 */
    color: #fff; /* 글자색 설정 */
    border: none; /* 테두리 없음 */
    padding: 18px 20px; /* 안쪽 여백 설정 */
    font-size: 16px; /* 폰트 크기 설정 */
    cursor: pointer; /* 마우스 커서 모양 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    width: 100%; /* 너비 100% 설정 */
}

/* 로그인 버튼 호버 효과 스타일 */
.form-group button:hover {
    background-color: #0056b3; /* 호버 시 배경색 변경 */
}
#special-button {
    background-color: #03cf5d; /* 네이버 배경 */
}
#special2-button {
    background-color: #FEE500; /* 카카오톡 배경 */
    color: black;
}
.form-group .save-id-checkbox input[type="checkbox"] {
    margin-right: 10px; /* 체크박스와 텍스트 사이 간격 설정 */
    width: auto; /* 너비 자동 설정 */
}
.save-id-checkbox span{ /*체크박스 텍스트 색깔 */
    display: block; /* 블록 요소로 표시 */
    margin-bottom: 5px; /* 아래 여백 설정 */
    color: #2b2a2aa5;
}
.save-id-checkbox input[type="checkbox"] {
    width: 15px;
    height: 15px;
}
/* 비밀번호 및 아이디 찾기 링크 컨테이너 스타일 */
.form-group.forgot-password {
    display: flex; /* Flexbox 사용 */
    justify-content: center; /* 가로 중앙 정렬 */
    cursor: pointer; /* 마우스 커서 모양 설정 */
}

/* 아이디 찾기 및 비밀번호 찾기 링크 스타일 */
.form-group.forgot-password a {
    margin: 0 10px; /* 링크 사이의 간격 설정 */
    color: #2b2a2aa5; /* 링크 색상 설정 */
    text-decoration: none; /* 밑줄 제거 */
}

/* 아이디 찾기 및 비밀번호 찾기 링크 호버 효과 스타일 */
.form-group.forgot-password a:hover {
    text-decoration: underline; /* 호버 시 밑줄 추가 */
}

.input-with-icon {
    position: relative;
    display: flex; /* Flexbox를 사용하여 내부 요소를 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
}

.input-with-icon .icon {
    width: 40px; /* 이미지 너비 설정 */
    height: auto; /* 이미지 높이 자동으로 설정 */
    

}

.input-with-icon input[type="text"] {
    width: calc(100% - 30px); /* 입력 필드 너비 설정 (이미지 너비 + 간격 포함) */
    padding: 10px; /* 안쪽 여백 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    font-size: 16px; /* 폰트 크기 설정 */
}

</style>