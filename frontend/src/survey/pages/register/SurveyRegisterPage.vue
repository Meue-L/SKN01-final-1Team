<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 align="center">설 문 조 사</h1>
      </v-col>
    </v-row>

    <!-- 주차 정보 -->
    <v-row>
      <v-col cols="12">주차 정보</v-col>
        <v-col>
          <v-text-field label="몇주차임?" outlined  v-model="week" @input="convertToNumber"></v-text-field>
        </v-col>
    </v-row>

    <!-- 각 질문 추가 -->
    <v-row v-for="(question, index) in qna" :key="index">
      <v-col cols="12">질문 {{ index + 1 }}</v-col>
      <v-col>
        <v-text-field v-model="question.text" label="질문" outlined></v-text-field>

        <v-btn @click="addOption(index)">응답 추가</v-btn>
        <v-col cols="12"></v-col>

        <!-- 옵션 추가 -->
        <v-text-field 
          v-for="(option, optionIndex) in question.options" 
          :key="optionIndex" 
          v-model="question.options[optionIndex]" 
          :label="`응답${optionIndex + 1}`"
          outlined
        ></v-text-field>

        <v-btn color="red" @click="removeQuestion(index)">질문 제거</v-btn>
      </v-col>
    </v-row>

    <v-col cols="12"></v-col>
    <v-row>
      <v-col>
        <v-btn color="green" @click="addQuestion">질문 추가</v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" @click="submitSurvey">제출</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { toRaw } from 'vue';
import { mapActions } from 'vuex'
const surveyModule = 'surveyModule'

export default {
  data() {
    return {
      week: "",
      qna: [
        {
          text: "",
          options: [""]
        }
      ],
      questions: [],
      answers: []
    };
  },
  
  methods: {
    ...mapActions(surveyModule, ['requestCreateSurveyToDjango']),

    addQuestion() {
      this.qna.push({ text: "", options: [""] });
    },
    addOption(index) {
      this.qna[index].options.push("");
    },
    removeQuestion(index) {
      this.qna.splice(index, 1);
    },
    convertToNumber() {
      this.week = Number(this.week);
    },
    async submitSurvey() {
      const rawData = toRaw(this.qna)
      for (let i = 0; i < rawData.length; i++) {
        console.log("qna:", rawData[i])
        this.questions.push(rawData[i].text)
        this.answers.push(rawData[i].options)
      }

      const rawQ = toRaw(this.questions)
      const rawA = toRaw(this.answers)
      const surveyData = {
        surveyId: this.week,
        questions: rawQ,
        answers: rawA,
      };
      console.log("surveyData:", surveyData);

      const res = await this.requestCreateSurveyToDjango(surveyData)
      const surveyId = res.response
      console.log("survey:", surveyId)

      await this.$router.push({
        name: 'SurveyReadPage',
        params: {surveyId: surveyId.toString()}
      })
    }
  }
};
</script>