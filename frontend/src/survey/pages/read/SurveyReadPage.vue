<template>
  <v-app class="survey-background">
    <v-container fluid class="survey-container">
      <v-row>
        <v-col>
          <h1 align="center" class="survey-title">문서 검색 서비스 개발을 위한 설문 조사</h1>
        </v-col>
      </v-row>
      <v-container fluid v-if="survey">
        <v-row v-for="(question, index) in survey.questions" :key="index" class="mb-4">
          <v-col>
            <v-card outlined class="survey-card">
              <v-card-title class="survey-question">{{ question }}</v-card-title>

              <v-radio-group v-model="answers[index]" :name="`question-${index}`">
                <v-radio
                  v-for="(option, idx) in survey.answers[index]"
                  :key="option"
                  :label="option"
                  :value="idx">
                  <template v-slot:label>
                    <span :class="{ 'selected-option': answers[index] === idx }">
                      {{ option }}
                    </span>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="end" class="mt-4">
          <v-col cols="auto">
            <v-btn color="rgba(204, 159, 1, 0.95)" @click="submitSurvey">제출</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
const surveyModule = 'surveyModule'
export default {
  props: {
    surveyId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      surveyTitle: '', // 설문조사 이름
      answers: {}, // 사용자의 답안을 저장하는 객체
    };
  },
  computed: {
    ...mapState(surveyModule, ['survey']),
  },
  methods: {
    ...mapActions(surveyModule, ['requestSurveyToDjango','requestCreateAnswerToDjango']),
    async submitSurvey() {

      const allAnswered = this.survey.questions.every((_, index) => this.answers[index] !== undefined);

      if (!allAnswered) {
        alert("설문을 완료해주세요");
        return; // 응답이 없으면 함수를 종료
      }

      let answers = Object.values(this.answers)
      const payload = { "surveyId": this.surveyId, "answers": answers }
      console.log(answers)
      await this.requestCreateAnswerToDjango(payload)
      await this.$router.push({name: 'ThankYouPage'})
    }
  },
  async created () {
    await this.requestSurveyToDjango(this.surveyId)
  }
};
</script>

<style scoped>
/* 전체 페이지 배경을 검은색으로 설정 */
.survey-background {
  background-color: #d2cbcb;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

/* survey-container의 패딩을 조정해 양쪽 끝에 여백을 추가 */
.survey-container {
  background-color: #1c1c1c;
  min-height: 100vh;
  padding: 150px 150px; /* 양쪽 끝에 150px 여백 추가 */
}

/* 설문 제목 스타일 - 노란색 */
.survey-title {
  color: rgb(234, 202, 16); /* 노란색 */
  font-weight: bold;
  margin-bottom: 40px; /* 질문과의 간격을 더 넓히기 위해 40px 설정 */
  margin-top: -100px; /* 제목을 위쪽으로 올리기 위해 음수 값 설정 */
}

/* v-card를 검은색 배경으로 설정하고, 테두리를 노란색으로 변경 */
.survey-card {
  background-color: #1c1c1c; /* 카드 배경 검은색 */
  color: rgba(204, 159, 1, 0.95); /* 카드 내 글씨도 노란색으로 */
  border: 2px solid rgba(204, 159, 1, 0.95); /* 노란색 테두리 */
  border-radius: 30px;
  padding: 30px;
}

/* 질문 텍스트 스타일 */
.survey-question {
  color: #d2d2d2;
  font-weight: bold;
}

/* 선택된 옵션 강조 */
.selected-option {
  font-weight: 900;
  color: rgb(255, 255, 255);
  text-shadow: 0.5px 0.5px 1px rgba(0,0,0,0.1);
  font-size: calc(1em + 2px);
}

.v-radio{
  color: #fff;
}


</style>
