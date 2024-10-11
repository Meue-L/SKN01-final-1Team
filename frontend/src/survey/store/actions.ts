import { ActionContext } from "vuex"
import { Survey, SurveyState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_SURVEY_LIST_TO_DJANGO } from "./mutation-types"

export type SurveyActions = {
    requestSurveyToDjango(context: ActionContext<SurveyState, any>, surveyId: number): Promise<void>
    requestCreateSurveyToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyId: number, questions: [string], answers: [[string]]
    }): Promise<AxiosResponse>
    requestCreateAnswerSurveyToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyId: number, answer: [string]
    }): Promise<AxiosResponse>
    requestCreateAnswerToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyId: number, answers: number[]
    }): Promise<AxiosResponse>
    requestSurveyListToDjango(context: ActionContext<SurveyState, any>): Promise<number[]>
    
}

const actions: SurveyActions = {
    async requestSurveyToDjango(context: ActionContext<SurveyState, any>, surveyId: number): Promise<void>{
        try {
            const res: AxiosResponse<Survey> = await axiosInst.djangoAxiosInst.get(`/survey/read/${surveyId}`);
            console.log('data:', res.data)
            context.commit('REQUEST_SURVEY_TO_DJANGO', res.data);
        } catch (error) {
            console.error('requestSurveyToDjango() 문제 발생:', error);
            throw error
        }
    },
    async requestCreateSurveyToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyId: number, questions: [string], answers: [[string]]
    }): Promise<AxiosResponse>{
        console.log("payload:", payload)
        const {surveyId, questions, answers} = payload
        console.log('전송할 데이터:', {surveyId, questions, answers})

        try{
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/survey/register', {surveyId, questions, answers})

            console.log('res:', res.data)
            return res.data
        }catch(error){
            alert('requestCreateSurveyToDjango() 문제 발생!')
            throw error
        }      
    },
    async requestCreateAnswerSurveyToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyId: number, answer: [string]
    }): Promise<AxiosResponse>{
        console.log("payload:", payload)
        const {surveyId, answer} = payload
        console.log('전송할 데이터:', {surveyId, answer})

        try{
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/survey/read/:surveyId', {surveyId, answer})

            console.log('res:', res.data)
            return res.data
        }catch(error){
            alert('requestCreateAnswerToDjango() 문제 발생!')
            throw error
        }    
    },
    async requestCreateAnswerToDjango(context: ActionContext<SurveyState, any>, payload: {
        surveyId: number, answers: number[]
    }): Promise<AxiosResponse>{
        console.log("payload:", payload)
        const surveyId = payload.surveyId
        const answer = payload.answers
        console.log('전송할 데이터:', {surveyId, answer})

        try{
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post('/survey/save', {"surveyId": surveyId, "answer": answer})

            console.log('res:', res.data)
            return res.data
        }catch(error){
            alert('requestCreateAnswerToDjango() 문제 발생!')
            throw error
        }
    },
    async requestSurveyListToDjango(context: ActionContext<SurveyState, any>): Promise<number[]>{
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/survey/list')
            const data: [number]= res.data
            console.log("data:",)
            return data
        }catch(error){
            console.error('requestBoardListToDjango(): '+ error)
            throw error
        }
    }
};

export default actions