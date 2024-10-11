import { ActionContext } from "vuex"
import { ResultReport, ResultReportState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_RESULTREPORT_LIST_TO_DJANGO } from "./mutation-types"

export type ResultReportActions = {
    requestResultReportListToDjango(context: ActionContext<ResultReportState, any>): Promise<void>
}

const actions: ResultReportActions = {
    async requestResultReportListToDjango(context: ActionContext<ResultReportState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/report/list')
            const data: ResultReport[] = res.data
            context.commit(REQUEST_RESULTREPORT_LIST_TO_DJANGO, data)
        }catch(error){
            console.error('requestResultReportListToDjango():'+ error)
            throw error
        }
    }
}

export default actions