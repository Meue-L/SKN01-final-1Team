import { ActionContext } from "vuex";
import { BacklogState } from "./states";
import axios, { AxiosResponse } from "axios";
import axiosInst from "@/utility/axiosInstance";


export type BacklogActions = {
    requestGenerateBacklogToFastAPI(
        context: ActionContext<BacklogState, any>, 
        payload: { username: string, reponame: string, branchname: string }): Promise<string>
    requestBacklogListToFastAPI(context: ActionContext<BacklogState, any>): Promise<string[][]>
};

const actions: BacklogActions = {
    async requestGenerateBacklogToFastAPI(
        context: ActionContext<BacklogState, any>, 
        payload: { username: string, reponame: string, branchname: string }): Promise<string> {
        console.log("payload:", payload)
        const { username, reponame, branchname } = payload
        
        try {
            console.log("requestGenerateBacklogToFastAPI()")
            const command = 6
            
            const response = await axiosInst.fastapiAxiosInst.post(
                '/request-ai-command', { command, "data": [username, reponame, branchname] })

            return response.data
        } catch (error) {
            console.log("requestGenerateBacklogToFastAPI() 중 문제 발생!: ", error)
            throw error
        }
    },
    async requestBacklogListToFastAPI(context: ActionContext<BacklogState, any>): Promise<string[][]> {
        console.log("requestBacklogListToFastAPI()")

        try {
            const response = await axiosInst.fastapiAxiosInst.get("/generate-backlog-result")
            return response.data
        } catch (error) {
            console.error("Error fetching data:", error)
            throw error
        }
    }

};

export default actions;
