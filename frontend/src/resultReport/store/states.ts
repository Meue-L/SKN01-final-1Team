export interface ResultReportState{
    resultreports: ResultReport[]
    resultreport: ResultReport | null
}

export interface ResultReport{
    resultReportId: number
    title: string
    writer: string
    content: string
    regDate: string
    updDate: string
}

const state: ResultReportState = {
    resultreports: [],
    resultreport: null
}

export default state