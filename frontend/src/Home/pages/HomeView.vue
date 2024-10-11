<template>
  <div id="app">
    <main class="main">
      <SurveyButton />
      <!-- <img class="NOODLE_logo" :src="require('@/assets/images/fixed/NOODLE_logo.png')" alt="NOODLE_logo"> -->
      <div class="Dock">
        <div v-for="icon in icons" :key="icon.name" :data-name="icon.name" class="Icon material-icons"
          @click="handleIconClick(icon.name)">
          {{ icon.icon }}
        </div>
      </div>
    </main>
    <!-- <div class="wrap">
      <div class="search">
        <input type="text" class="searchTerm" v-model="searchQuery" placeholder="찾으시는 Backlog를 입력해주세요." />
        <button type="submit" class="searchButton" @click="submitSearch">
          <i class="material-icons">search</i>
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { mapActions, mapState } from "vuex";
import SurveyButton from '@/floatingButton/pages/floatingButton.vue';

const authenticationModule = 'authenticationModule'

export default {
  components: { SurveyButton },
  setup() {
    const store = useStore()

    const goToGithubLogin = async () => {
      await store.dispatch("authenticationModule/requestGithubOauthRedirectionToDjango")
    }

    const goToGithubLogout = async () => {
      await store.dispatch("authenticationModule/requestLogoutToDjango")
      localStorage.removeItem("userToken")
    }

    return {
      goToGithubLogin,
      goToGithubLogout
    }
  },
  data() {
    return {
      searchQuery: '',  // Model to hold the search input value
      userToken: localStorage.getItem("userToken")
    };
  },
  computed: {
    ...mapState(authenticationModule, ["isAuthenticated"]),
    icons() {
      return this.isAuthenticated ? [
        { name: '기능버튼1', icon: 'face' },
        { name: 'projectManage', icon: 'watch_later' },
        { name: '기능버튼3', icon: 'zoom_in' },
        { name: '기능버튼4', icon: 'wb_sunny' },
        { name: 'Logout', icon: 'logout' },
      ] : [
        { name: '기능버튼1', icon: 'face' },
        { name: 'projectManage', icon: 'watch_later' },
        { name: '기능버튼3', icon: 'zoom_in' },
        { name: '기능버튼4', icon: 'wb_sunny' },
        { name: 'Login', icon: 'person' },
      ];
    }
  },
  methods: {
    submitSearch() {
      // 검색로직
      console.log("Searching for:", this.searchQuery);
    },
    async goToProjectManage() {
      await this.$router.push({ name: 'projectManage' })
    },
    handleIconClick(name) {
      if (name === 'projectManage') {
        if (this.isAuthenticated) {
          this.goToProjectManage()
        } else {
          this.goToGithubLogin()
        }
      } else if (name === 'Login') {
        this.goToGithubLogin()
      } else if (name === 'Logout') {
        this.goToGithubLogout()
      }
    }
  },
  mounted() {
    if (this.userToken) {
      this.$store.state.authenticationModule.isAuthenticated = true;
    }
    console.log(this.isAuthenticated)
  }
};
</script>

<style scoped>
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

/* @import url('https://fonts.googleapis.com/icon?family=Material+Icons'); */
/*google font 임포트 방법2*/

.main {
  display: flex;
  justify-content: center;
  /* 좌우 중앙 정렬 */
  align-items: center;
  /* 상하 중앙 정렬 */
  height: 100vh;
  /* 뷰포트 전체 비율로 차지하게 설정 */
  background-color: black;
  z-index: 500;
}

.NOODLE_logo {
  display: block;
  margin: 0 auto;
  /* 로고 크기 조절 가능 */
  width: 450px;
  height: 450px;
  /* 상하좌우 미세 조정 가능 */
  position: relative;
  top: -200px;
  left: 0%;
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -moz-font-feature-settings: 'liga';
  -moz-osx-font-smoothing: grayscale;
}

/* Dock관련 설정 */
.Dock {
  position: fixed;
  left: 50%;
  bottom: 20px;
  /* 하단과의 공간 */
  padding: 0px 30px;
  transform: translateX(-50%);
  perspective: 100px;
  z-index: 9999;
}

.Dock:before {
  content: "";
  position: absolute;
  left: 0px;
  bottom: -3px;
  width: 100%;
  height: 22px;
  background-color: rgba(133, 133, 133, 0.53);
  z-index: -1;
  transform-style: preserve-3d;
  transform: rotateX(45deg);
}

/* 아이콘 관련 설정 */
.Icon {
  position: relative;
  cursor: pointer;
  display: inline-block;
  /* 아이콘박스 크기 */
  width: 48px;
  height: 48px;
  margin: 0px 5px 5px 0px;
  border-radius: 6px;
  background-color: rgba(204, 159, 1, 0.95);
  color: white;
  transition: all 0.3s;
  text-align: center;
  /* 아이콘 내 그림 크기 */
  font-size: 30px;
  /* line-height: px; */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* 아이콘 hover관련 설정 */
.Icon:hover {
  width: 72px;
  height: 72px;
  font-size: 54px;
  background-color: rgba(90, 0, 50, 0.85);
}

.Icon:active {
  width: 70px;
  height: 70px;
  font-size: 50px;
  line-height: 70px;
  background-color: rgba(50, 0, 10, 0.85);
}

.Icon[data-name]:hover:after {
  content: attr(data-name);
  padding: 4px;
  color: rgba(0, 0, 0, 0.888);
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 2;
  font-family: arial;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  border-radius: 5px;
  background: #eeeeee;
}

.Icon:hover:before {
  content: "";
  color: rgba(0, 0, 0, 0.888);
  position: absolute;
  left: 50%;
  top: -50%;
  width: 0px;
  height: 0px;
  transform: translate(-50%, 15px) rotate(-45deg);
  white-space: nowrap;
  font-family: arial;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  width: 10px;
  height: 10px;
  background: #eeeeee;
}


/* search bar관련 설정들 */

/* 검색 창 위치 관련 설정 */
.wrap {
  width: 450px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.search {
  width: 100%;
  position: relative;
  display: flex;
}

/* 검색 창 */
.searchTerm {
  width: 410px;
  height: 50px;
  border: 3px solid rgba(204, 159, 1);
  border-right: none;
  padding: 0 5px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: rgb(252, 235, 174);
  /* 검색창에 글이 입력된 후 포커스가 벗어났을 때 글자의 색 */
  box-sizing: border-box;
}

/* 검색창에 입력하는 글자 색 */
.searchTerm:focus {
  color: rgb(252, 252, 252);
}

/* 검색 버튼 */
.searchButton {
  width: 40px;
  height: 50px;
  border: 1px solid rgba(204, 159, 1);
  background: rgba(204, 159, 1);
  color: #fff;
  text-align: center;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  box-sizing: border-box;
}

.searchButton .material-icons {

  font-size: 30px;
  line-height: 36px;
}
</style>
