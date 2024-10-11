import authenticationModule from '@/authentication/store/authenticationModule'
import productManageModule from '@/project_manage/store/productManageModule'
import surveyModule from '@/survey/store/surveyModule'
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    surveyModule,
    authenticationModule,
    productManageModule,
  }
})
