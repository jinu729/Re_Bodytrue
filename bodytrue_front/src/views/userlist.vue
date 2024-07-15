<template>
  <div class="adminuser">
    <main class="admin_userlist-main">
      <div class="admin_userlist-bodyheader">
        회원 목록
      </div>
      <div class="admin_userlist-bodysearch">
        <input 
          v-model="searchTerm" 
          type="text" 
          class="search-input" 
          placeholder="이름 검색" 
          @keyup.enter="searchUsers"
        >
        <button class="search-button" @click="searchUsers">🔍</button>
      </div>
      <div class="admin_userlist-bodycontent">
        <table class="bingbing">
          <thead>
            <tr>
              <th>이메일</th>
              <th>비밀번호</th>
              <th>이름</th>
              <th>핸드폰번호</th>
              <th>성별</th>
              <th>주소1</th>
              <th>주소2</th>
              <th>정지/해제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, i) in paginatedUsers" :key="i">
              <td>{{ user.user_email }}</td>
              <td>{{ user.user_pwd }}</td>
              <td>{{ user.user_name }}</td>
              <td>{{ user.user_tel }}</td>
              <td>{{ user.user_sex }}</td>
              <td>{{ user.user_add1 }}</td>
              <td>{{ user.user_add2 }}</td>
              <td>
                <button class="buttons" @click="  console.log(user.user_ban), toggleUserBan(user.user_no, user.user_ban);">
                  {{ user.user_ban ? '✔️' : '❌' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <ul class="admin_page">
                <li v-for="page in totalPages" :key="page">
                    <a href="#" @click.prevent="gotoPage(page)" :class="{ active: page === currentPage }">
                        {{ page }}
                    </a>
                </li>
            </ul>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: '',
      userList: [],
      currentPage: 1,
      perPage: 10, // 페이지 당 아이템 수
    };
  },
  computed: {
    // 현재 페이지의 데이터 계산
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.userList.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.userList.length / this.perPage);
    }
  },
  methods: {
    getUserList() {
      axios.get('http://localhost:3000/admin/userlist')
        .then(response => {
          this.userList = response.data;
          console.log(this.userList);
        })
        .catch(error => {
          console.error('Error fetching user list:', error);
        });
    },
    searchUsers() {
      axios.get('http://localhost:3000/admin/searchname', {
        params: {
          name: this.searchTerm
        }
      })
      .then(response => {
        this.userList = response.data;
      })
      .catch(error => {
        console.error('Error searching users:', error);
      });
    },
    toggleUserBan(user_no, user_ban) {
      console.log('user_no', user_no, 'current ban status:', user_ban);
      axios({
        url: 'http://localhost:3000/admin/toggleuserban',
        method: 'POST',
        data: {
          user_no: user_no,
          user_ban: user_ban
        }
      })
      .then(() => {
        if (user_ban === 0) {
          this.$swal('회원정지 되었습니다.');
        } else {
          this.$swal('회원정지가 해제되었습니다.');
        }
        this.getUserList(); // 업데이트 후 목록 다시 불러오기
      })
      .catch(error => {
        console.error('Error toggling user ban:', error);
        this.$swal('Error toggling user ban'); // 사용자에게 에러 피드백
      });
    },
    gotoPage(page) {
      this.currentPage = page;
    }
  },
  mounted() {
    this.getUserList();
  }
};
</script>



<style scoped>
/* admin_userlist main 스타일 시작 */
.admin_userlist-main {
    width: 80%; /* 부모 요소가 이미 중앙 정렬되므로 100% 너비 사용 */
    margin: 0 auto;
    padding: 2px; /* 내부 패딩을 10px로 설정 */
    margin-top: 20px;
}
/*헤더부분(=회원목록)*/
.admin_userlist-bodyheader {
    background-color: #00C7AE; /* 배경색을 청록색으로 설정 */
    color: #fff; /* 텍스트 색상을 흰색으로 설정 */
    padding: 10px 10px; /* 상하 패딩 10px, 좌우 패딩 20px 설정 */
    font-weight: bold; /* 폰트를 굵게 설정 */
    font-size: 26px; /* 폰트 크기를 24px로 설정 */
    border-radius: 10px 10px 10px 10px; /* 상단 좌우 모서리를 둥글게 설정 */
    padding-left:20px;
}

/*검색어 입력*/
.admin_userlist-bodysearch {
    margin-top: 20px; /* 상단 여백을 20px로 설정 */
    display: flex; /* 플렉스 박스 레이아웃 사용 */
    justify-content: flex-end; /* 자식 요소들을 오른쪽으로 정렬 */
    align-items: center; /* 자식 요소들을 세로 축 기준으로 중앙 정렬 */
    padding-bottom: 20px;
}
.search-input {
    width: 200px; /* 입력 필드의 너비를 200px로 설정 */
    padding: 9px; /* 내부 패딩을 10px로 설정 */
    border: 2px solid #00C7AE; /* 테두리를 청록색으로 설정하고 두께를 2px로 설정 */
    border-radius: 10px 0 0 10px; /* 왼쪽 모서리를 둥글게 설정 */
    outline: none; /* 포커스 시 나타나는 기본 외곽선을 제거 */
}
.search-button {
    padding: 10px; /* 내부 패딩을 10px로 설정 */
    border: 1px solid #00C7AE; /* 테두리를 청록색으로 설정하고 두께를 1px로 설정 */
    border-left: none; /* 왼쪽 테두리를 제거 */
    border-radius: 0 10px 10px 0; /* 오른쪽 모서리를 둥글게 설정 */
    background-color: #00C7AE; /* 배경색을 청록색으로 설정 */
    color: #fff; /* 텍스트 색상을 흰색으로 설정 */
    cursor: pointer; /* 마우스 커서를 포인터로 변경 */
}

/*회원목록테이블*/
.admin_userlist-bodycontent {
    /* background-color: #97cfcb; */
    color: #111111;
    /* border: 2px solid #3b4746; */
    width: 100%;
    height: 400px;
    font-size: 18px;
    text-align: center;
    margin: auto;
    border-collapse: collapse;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
}

.admin_userlist-bodycontent table{
    border-collapse: collapse;
}

.admin_userlist-bodycontent tr{
    border: 1px solid #3b4746;
}

/* .admin_userlist-bodycontent th:nth-child(7){
  padding-right: 8px;
}

.admin_userlist-bodycontent td:nth-child(7){
  padding-right: 8px;
} */

.admin_userlist-bodycontent th:nth-child(8){
    border: 1px solid #3b4746;
}

.admin_userlist-bodycontent td:nth-child(8){
    border: 1px solid #3b4746;
}

.admin_userlist-bodycontent th{
  background-color: rgba(218, 218, 218, 0.5);
}

.admin_page {
    display: flex;
    gap: 10px;
    list-style: none;
    padding: 30px;
    justify-content: center;
}
.admin_page li {
    display: inline;
}
.admin_page a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: #000;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}
.admin_page a.active {
    background-color: #00bfa5;
    color: white;
}
.admin_page a:hover {
    background-color: #ddd;
}
.buttons {
  background-color: white;
  border: none;
}
.page{
  width: 20px;
  background-color: #4fced2;
  border: 1px solid #4fced2;
  border-radius: 5px;
}
.page:hover{
  width: 20px;
  background-color:transparent;
  border: 1px solid #4fced2;
  border-radius: 5px;
}
.deleteuser{
    width: 25px;
    height: 30px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: transparent;
    color: white;
}
.deleteuser:hover{
    width: 25px;
    height: 30px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #ffa4a4;
    color: rgb(0, 0, 0);
}
.bingbing {
  border-radius: 5px;
}
/* admin_userlist main 스타일 끝 */

/* 반응형 웹을 위한 미디어 쿼리 시작 */
@media (max-width: 768px) {
    header .wrap {
        flex-direction: column; /* 플렉스 방향을 수직으로 변경 */
        align-items: flex-start; /* 자식 요소들을 왼쪽으로 정렬 */
    }
    .nav_right .icon_list {
        flex-direction: column; /* 플렉스 방향을 수직으로 변경 */
        align-items: flex-start; /* 자식 요소들을 왼쪽으로 정렬 */
    }
    .icon_list .item {
        margin: 5px 0; /* 위아래 여백을 5px로 설정 */
    }
    .icon_list .line {
        display: none; /* 구분선을 숨김 */
    }
    .admin_userlist-main {
        width: 100%; /* 작은 화면에서는 전체 너비 사용 */
        padding: 10px; /* 내부 패딩을 10px로 설정 */
    }
    .admin_userlist-bodysearch {
        flex-direction: column; /* 플렉스 방향을 수직으로 변경 */
        align-items: flex-start; /* 자식 요소들을 왼쪽으로 정렬 */
    }
    .search-input {
        width: 100%; /* 입력 필드의 너비를 100%로 설정 */
        border-radius: 20px; /* 모서리를 둥글게 설정 */
        margin-bottom: 10px; /* 아래쪽 여백을 10px로 설정 */
    }
    .search-button {
        width: 100%; /* 버튼의 너비를 100%로 설정 */
        border-radius: 20px; /* 모서리를 둥글게 설정 */
    }
}
/* 반응형 웹을 위한 미디어 쿼리 끝 */

</style>