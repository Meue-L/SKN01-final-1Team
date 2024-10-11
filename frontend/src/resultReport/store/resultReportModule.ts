import actions, { ResultReportActions } from "./actions"
import mutations, { ResultReportMutations } from "./mutations"
import state, { ResultReportState } from "./states"


export interface ResultReportModule {
    namespaced: true
    state: ResultReportState
    actions: ResultReportActions
    mutations: ResultReportMutations
}


const resultReportModule: ResultReportModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default resultReportModule