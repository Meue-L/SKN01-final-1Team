import { REQUEST_RESULTREPORT_LIST_TO_DJANGO } from "./mutation-types"
import { ResultReport, ResultReportState } from "./states"
import { MutationTree } from "vuex"

export interface ResultReportMutations extends MutationTree<ResultReportState> {
    [REQUEST_RESULTREPORT_LIST_TO_DJANGO](state: ResultReportState, receivedData: ResultReport[]): void
}

// interface의 Boards[]배열에 receiveData를 받는다
const mutations: MutationTree<ResultReportState>={
    [REQUEST_RESULTREPORT_LIST_TO_DJANGO](state: ResultReportState, receivedData: ResultReport[]): void{
        state.resultreports = receivedData
    }
}

export default mutations as ResultReportMutations