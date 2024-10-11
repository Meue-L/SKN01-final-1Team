<template>
  <div class="app-container">
    <div class="container">
      <div class="leftbox">
        <div class="leftbox_title">
          <span>Backlog Board</span>
          <div class="switch white">
            <input type="radio" id="switch-off" v-model="isChecked" :value="false" />
            <input type="radio" id="switch-on" v-model="isChecked" :value="true" />
            <label for="switch-off">status</label>
            <label for="switch-on">Domain</label>
            <span class="toggle" :class="{ 'checked': isChecked }"></span>
          </div>
        </div>
        <v-card v-if="backlogList" class="commit-list-container">
          <v-list style="background-color: #2f2f2f;">
            <v-list-item v-for="(item, index) in backlogList" :key="index">
              <v-card style="background-color: #444444;">
                <v-card-item>
                  <v-card-text style="color: white;">{{ item }}</v-card-text>
                </v-card-item>
              </v-card>
            </v-list-item>
          </v-list>
        </v-card>
        <!-- <img class="example_backlog" :src="require('@/assets/images/fixed/example_backlog.png')" alt="example_backlog"> -->
        <!-- <v-container>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" sm="4" v-for="(column, columnIndex) in columns" :key="columnIndex">
                <v-card>
                  <v-card-title class="KanbanBoardTitle" >{{ column.name }}</v-card-title>
                  <v-diver></v-diver>
                  <v-card-text class="KanbanBoardCard">
                    <v-card
                      eslint-disable-next-line
                      v-for="task in column.tasks"
                      :key="task.id"
                      class="mb-2"
                    >
                      <v-card-text>{{ task.name }}</v-card-text>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container> -->
        <!-- <div class="chat-bar">
            <input type="email" placeholder="생성을 원하시는 Backlog를 입력해주세요!" v-model="email" />
            <a href="/" @click.prevent="handleSubmit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M15.6 15.47A4.99 4.99 0 0 1 7 12a5 5 0 0 1 10 0v1.5a1.5 1.5 0 1 0 3 0V12a8 8 0 1 0-4.94 7.4 1 1 0 1 1 .77 1.84A10 10 0 1 1 22 12v1.5a3.5 3.5 0 0 1-6.4 1.97zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </a>
          </div> -->
      </div>
      <div class="rightbox">
        <div class="rightbox_title">
          <span>Commit List</span>
          <v-btn @click="example" class="example_btn">클릭해보세요!</v-btn>
          <v-btn @click="Refresh" class="Refresh">Refresh</v-btn>
        </div>
        <div v-if="!isExample">
          <div class="select-container" v-if="repos">
            <v-select v-model="selectedRepository" :value="selectedRepository" :items="repos" class="repository"
              @change="setRepositorySelect($event)">
              <option v-for="(item, index) in repos" :key="index" :value="item.value">{{ item.value }}</option>
            </v-select>
            <div v-if="branches">
              <v-select v-model="selectedBranches" :value="selectedBranch" :items="branches" class="branch"
                @change="setBranchSelect($event)">
                <option v-for="(item, index) in branches" :key="index" :value="item.value">{{ item.value }}</option>
              </v-select>
            </div>
            <div v-else>
              <v-select :value="selectedBranches" class="branches"></v-select>
            </div>
          </div>
          <div class="select-container" v-else>
            <v-select :value="selectedRepository"></v-select>
            <v-select :value="selectedBranches"></v-select>
          </div>

          <v-card v-if="commits" class="commit-list-container">
            <v-list style="background-color: #2f2f2f;">
              <v-list-item v-for="(item, index) in commits" :key="index">
                <v-card style="background-color: #444444;">
                  <v-card-item>
                    <v-card-text style="color: white;">{{ item }}</v-card-text>
                  </v-card-item>
                </v-card>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card v-else class="commit-list-container">
          </v-card>
        </div>
        <div v-else>
          <div class="select-container">
            <v-select :value="exampleRepository"></v-select>
            <v-select :value="exampleBranch"></v-select>
          </div>
          <v-card v-if="exampleCommits" class="commit-list-container">
            <v-list style="background-color: #2f2f2f;">
              <!-- 카드 색상 -->
              <v-list-item v-for="(item, index) in exampleCommits" :key="index">
                <v-card style="background-color: #444444;">
                  <!-- 위는 카드 아래는 글씨 -->
                  <v-card-item>
                    <v-card-text style="color: white;">{{ item }}</v-card-text>
                  </v-card-item>
                </v-card>
              </v-list-item>
            </v-list>
          </v-card>
          <v-card v-else class="commit-list-container">
          </v-card>
        </div>
      </div>
      <!-- <div class="select-container" v-else>
        <v-select :value="selectedRepository"></v-select>
        <v-select :value="selectedBranches"></v-select>
      </div> -->
      <!-- <v-card v-if="commits" class="commit-list-container">
        <v-list>
          <v-list-item v-for="(item, index) in commits" :key="index">
            <v-card>
              <v-card-item>
                <v-card-text>{{ item }}</v-card-text>
              </v-card-item>
            </v-card>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card v-else class="commit-list-container">
      </v-card> -->
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { mapActions, mapState } from 'vuex'
import axios from 'axios'
import { toRaw } from 'vue';
const productManageModule = 'productManageModule'
const authenticationModule = 'authenticationModule'
const backlogModule = 'backlogModule'

export default {
  name: "App",
  setup() {
    const store = useStore()

    const goToGithubLogin = async () => {
      await store.dispatch("authenticationModule/requestGithubOauthRedirectionToDjango")
    }

    return {
      goToGithubLogin
    }
  },
  data() {
    return {
      isChecked: true, // 스위치의 초기 상태
      columns: [
        {
          name: 'To Do',
          tasks: [
            { id: 1, name: '작업 1' },
            { id: 2, name: '작업 2' },
          ],
        },
        {
          name: 'In Progress',
          tasks: [
            { id: 3, name: '작업 3' },
          ],
        },
        {
          name: 'Done',
          tasks: [
            { id: 4, name: '작업 4' },
            { id: 5, name: '작업 5' }
          ],
        },
      ],
      selectedRepository: "Select a repository",
      selectedBranches: "Select a branch",
      selectedCommits: "",
      exampleRepository: "noodle-frontend",
      exampleBranch: "develop",
      exampleCommits: [],
      isExample: false,
      backlogList: null,
    };
  },
  computed: {
    ...mapState(productManageModule, ["repos", "branches", "commits"]),
  },
  watch: {
    async selectedRepository(newVal) {
      console.log('selectedRepository:', newVal)

      if (newVal !== null) {
        await this.setRepositorySelect()
      }
    },
    async selectedBranches(newVal) {
      console.log('selectedBranches:', newVal)

      if (newVal !== null) {
        await this.setBranchSelect()
      }
    }
  },
  methods: {
    ...mapActions(productManageModule, ["requestSaveReposListToDjango", "requestGetReposListToDjango", "requestSaveBranchListToDjango", "requestGetBranchListToDjango", "requestSaveCommitListToDjango", "requestGetCommitListToDjango"]),
    ...mapActions(backlogModule, ["requestGenerateBacklogToFastAPI", "requestBacklogListToFastAPI"]),
    async setRepositorySelect(event) {
      const selectedValue = event
      // this.selectedBranches = selectedValue
      const userToken = localStorage.getItem('userToken')
      const payload = { 'userToken': userToken, 'reponame': this.selectedRepository }
      await this.requestSaveBranchListToDjango(payload)
      const res = await this.requestGetBranchListToDjango(payload)
      console.log("res:", res)
    },
    async setBranchSelect(event) {
      const selectedValue = event
      // this.selectedBranches = selectedValue
      const userToken = localStorage.getItem('userToken')
      const payload = { 'userToken': userToken, 'reponame': this.selectedRepository, 'branchname': this.selectedBranches }
      await this.requestSaveCommitListToDjango(payload)
      const res = await this.requestGetCommitListToDjango(payload)
      console.log("commits response:", res)
      console.log("commits:", this.commits)
    },
    async Refresh() {
      this.isExample = false
      const userToken = localStorage.getItem('userToken')
      const payload = { 'userToken': userToken }
      await this.requestSaveReposListToDjango(payload)
      const res = await this.requestGetReposListToDjango(payload)
    },
    async example() {
      this.isExample = true;
      try {
        const url = `https://api.github.com/repos/EDDI-RobotAcademy/noodle-backend/commits?sha=develop`
        const response = await axios.get(url)
        const data = response.data
        const proxyData = []
        console.log('data:', data)
        for (let i = 0; i < data.length; i++) {
          proxyData.push(data[i].commit.message)
        }
        this.exampleCommits = toRaw(proxyData)
        console.log(this.exampleCommits)

        const payload = { username: "EDDI-RobotAcademy", reponame: "noodle-backend", branchname: "develop" }
        await this.requestGenerateBacklogToFastAPI(payload)
        this.backlogList = await this.requestBacklogListToFastAPI()
        if (this.backlogList == "아직 데이터를 처리 중이거나 요청한 데이터가 없습니다") {
          this.backlogList = ["아직 데이터를 처리 중이거나 요청한 데이터가 없습니다"]
        }

        console.log("backlogList:", this.backlogList)
        console.log("type:", this.backlogList.type)

      } catch (error) {
        console.error("Error fetching commits:", error)
      }
    }
  },
  mounted() {
    if (localStorage.getItem('userToken')) {
      // 사용자 인증 과정 추가해야 함
    } else {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.")
      this.goToGithubLogin()
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Orbit&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');


html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  height: 100%
}

.container {
  display: flex;
  /* Flexbox로 레이아웃 설정 */
  height: 100%;
  /* Viewport height를 100%로 설정 (화면 전체 높이) */
  /* align-items: stretch; */
}

/* 왼쪽 box */
.leftbox {
  position: relative;
  width: 75%;
  /* 왼쪽 박스의 너비를 75%로 설정 */
  height: 100%;
  /* 왼쪽 박스의 높이를 100%로 설정 (화면 전체 높이) */
  background-color: #1c1c1c;
  /* 왼쪽 박스의 배경색을 파란색으로 설정 */
  border-right: 3px solid rgba(204, 159, 1);
  /* 오른쪽에 두께 3px의 노란색 테두리 추가 */
}

.leftbox_title {
  display: flex;
  /* Flexbox로 레이아웃 설정 */
  justify-content: space-between;
  /* 좌우 요소 사이에 공간을 균등 분배 */
  align-items: center;
  /* 요소들을 수직 가운데 정렬 */
  margin-top: 20px;
  /* 위쪽 여백을 20px 추가 */
  margin-left: 20px;
  /* 왼쪽 여백을 20px 추가 */
  margin-right: 20px;
  /* 오른쪽 여백을 20px 추가 */
  font-size: 30px;
  /* 폰트 크기를 30px로 설정 */
  color: rgba(204, 159, 1);
}

.leftbox_title span {
  color: rgba(204, 159, 1);
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
}

.KanbanBoardTitle {
  background-color: rgba(204, 159, 1);
}

.KanbanBoardCard {
  background-color: #444444;
}


.mb-2 {
  background-color: #c5c5c5;
}

/* 오른쪽 box */
.rightbox {
  /* align-items: stretch; */
  width: 25%;
  /* 오른쪽 박스의 너비를 25%로 설정 */
  height: 100%;
  /* 오른쪽 박스의 높이를 100%로 설정 (화면 전체 높이) */
  background-color: #1c1c1c;
  /* 오른쪽 박스의 배경색을 초록색으로 설정 */
}

.rightbox_title span {
  color: rgba(204, 159, 1);
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
}

.rightbox_title {
  display: flex;
  /* Flexbox로 레이아웃 설정 */
  justify-content: space-between;
  /* 좌우 요소 사이에 공간을 균등 분배 */
  align-items: center;
  /* 요소들을 수직 가운데 정렬 */
  margin-top: 20px;
  /* 위쪽 여백을 20px 추가 */
  margin-left: 10px;
  /* 왼쪽 여백을 10px 추가 */
  margin-right: 10px;
  /* 오른쪽 여백을 10px 추가 */
  font-size: 30px;
  /* 폰트 크기를 30px로 설정 */
}

.example_btn {
  background-color: rgba(204, 159, 1);
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-size: 15px;
}

.Refresh {
  background-color: rgba(204, 159, 1);
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* 커밋리스트 나오는 v-card 설정 */
.commit-list-container {
  background-color: #2F2F2F;
  color: #B4B4B4;
  overflow: auto;
  width: calc(100% - 10px);
  height: 600px;
  margin-left: 5px;
  margin-top: 15px;
}

/* ---------- SWITCH ---------- */

/* 스위치에 관한 설정 */
.switch {
  display: flex;
  align-items: center;
  background: #fff;
  /* 스위치의 배경색을 흰색으로 설정 */
  border-radius: 32px;
  /* 스위치의 테두리를 둥글게 설정 (32px의 반경) */
  height: var(--switch-height, 20px);
  /* 스위치의 높이 설정 (변경 가능하도록 변수 사용) */
  position: relative;
  /* 자식 요소의 위치를 기준으로 상대적으로 위치 설정 */
  width: var(--switch-width, 60px);
  /* 스위치의 너비 설정 (변경 가능하도록 변수 사용) */
  padding: 0 10px;
  /* 라벨을 위한 패딩 추가 */
  /* 위치 조정 */
  transform: translateX(-80px);
  /* 왼쪽으로 20px 이동 (값을 조정하여 위치 변경 가능) */
}

/* 스위치 글자 관련 설정 */
.switch label {
  color: #fff;
  /* 라벨의 텍스트 색상을 흰색으로 설정 */
  font-size: 12px;
  /* 라벨의 폰트 크기를 12px로 설정 */
  font-weight: 500;
  /* 라벨의 폰트 두께를 500으로 설정 */
  line-height: var(--switch-height, 20px);
  /* 글의 세로 정렬을 위해 line-height를 스위치 높이에 맞춤 */
  text-transform: uppercase;
  /* 라벨 텍스트를 대문자로 변환 */
  transition: color 0.2s ease;
  /* 라벨의 색상 변화에 0.2초의 전환 효과 적용 */
  width: 35px;
  /* 라벨의 너비 설정 */
}

.switch label:nth-of-type(1) {
  position: absolute;
  /* 라벨의 위치를 절대 위치로 설정 */
  left: -85%;
  /* 첫 번째 라벨을 스위치 왼쪽에 위치시키기 위해 왼쪽으로 85% 이동 */
  text-align: right;
  /* 첫 번째 라벨의 텍스트를 오른쪽 정렬 */
}

.switch label:nth-of-type(2) {
  position: absolute;
  /* 라벨의 위치를 절대 위치로 설정 */
  right: -70%;
  /* 두 번째 라벨을 스위치 오른쪽에 위치시키기 위해 오른쪽으로 70% 이동 */
  text-align: left;
  /* 두 번째 라벨의 텍스트를 왼쪽 정렬 */
}

.switch input {
  height: var(--switch-height, 20px);
  /* 스위치 입력의 높이 설정 */
  left: 0;
  /* 입력 요소를 왼쪽에 위치 */
  opacity: 0;
  /* 입력 요소를 보이지 않도록 투명도 0으로 설정 */
  position: absolute;
  /* 입력 요소의 위치를 절대 위치로 설정 */
  top: 0;
  /* 입력 요소를 상단에 위치 */
  width: var(--switch-width, 100px);
  /* 스위치 입력의 너비를 100px로 설정 */
  z-index: 2;
  /* 입력 요소를 다른 요소보다 앞에 표시 (레이어 순서 설정) */
}

.switch input:checked~label:nth-of-type(1) {
  color: #fff;
  /* 첫 번째 라벨의 텍스트 색상을 흰색으로 설정 (스위치가 선택되었을 때) */
}

.switch input:checked~label:nth-of-type(2) {
  color: #808080;
  /* 두 번째 라벨의 텍스트 색상을 회색으로 설정 (스위치가 선택되었을 때) */
}

.switch input~ :checked~label:nth-of-type(1) {
  color: #808080;
  /* 첫 번째 라벨의 텍스트 색상을 회색으로 설정 (스위치가 선택되지 않았을 때) */
}

.switch input~ :checked~label:nth-of-type(2) {
  color: #fff;
  /* 두 번째 라벨의 텍스트 색상을 흰색으로 설정 (스위치가 선택되지 않았을 때) */
}

.switch input:checked~.toggle {
  left: 10px;
  /* 스위치가 선택되었을 때 토글이 왼쪽에 위치 */
}

.switch input~ :checked~.toggle {
  left: 40px;
  /* 스위치가 선택되지 않았을 때 토글이 오른쪽에 위치 */
}

.switch input:checked {
  z-index: 0;
  /* 입력 요소의 z-index를 0으로 설정하여 다른 요소보다 뒤로 감 */
}

.toggle {
  background: #4a4a4a;
  /* 토글의 배경색을 어두운 회색으로 설정 */
  border-radius: 50%;
  /* 토글의 모양을 원형으로 설정 (50% 반경) */
  height: calc(var(--switch-height, 20px) - 8px);
  /* 토글의 높이를 스위치 높이보다 약간 작게 설정 */
  left: 0;
  /* 토글을 왼쪽에 위치 */
  position: absolute;
  /* 토글의 위치를 절대 위치로 설정 */
  top: 4px;
  /* 토글을 위에서 4px 내려서 위치 */
  transition: left 0.2s ease;
  /* 토글이 이동할 때 0.2초의 전환 효과 적용 */
  width: calc(var(--switch-height, 20px) - 8px);
  /* 토글의 너비를 스위치 높이와 비슷하게 설정 */
  z-index: 1;
  /* 토글을 다른 요소보다 앞에 표시 */
}

.toggle.checked {
  left: calc(var(--switch-width, 100px) - calc(var(--switch-height, 20px) - 8px));
  /* 스위치가 선택되었을 때 토글이 오른쪽에 위치 */
}


/* chat bar부분 */
.chat-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(228, 228, 228);
  padding: 10px;
  width: 50%;
  /* Set the width to 50% */
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  /* Absolute positioning */
  left: 50%;
  /* Center it horizontally relative to .leftbox */
  transform: translateX(-50%);
  /* Adjust for perfect centering */
  bottom: 20px;
  /* Position at the bottom of .leftbox */
}

.chat-bar input {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 5px;
  font-size: 14px;
}

.chat-bar a {
  background-color: rgba(204, 159, 1);
  border-radius: 50%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

.chat-bar a svg {
  width: 20px;
  height: 20px;
  fill: white;
}


.select-container {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  margin-top: 20px;
  gap: 20px;
  color: rgb(248, 235, 54);
}


.example_backlog {
  width: 95%;
  height: 50%;
  margin-left: 15px;
}
</style>
