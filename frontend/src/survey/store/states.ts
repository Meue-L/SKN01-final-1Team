export interface SurveyState{
    surveys: Survey[]
    survey: Survey | null
}

export interface Survey{
    surveyId: number,
    questions: string[],
    answers: string[][]
}

export interface Question{
    question: string
}

export interface Answer{
    answer: [string]
}

const state: SurveyState = {
    surveys: [],
    survey: null
}

export default state