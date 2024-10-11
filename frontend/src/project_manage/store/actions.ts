import { ActionContext } from "vuex";
import { ProductManageState } from "./states";
import axios, { AxiosResponse } from "axios";
import axiosInst from "@/utility/axiosInstance";


export type ProductManageActions = {
    requestSaveReposListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string }): Promise<void>;
    requestGetReposListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string }): Promise<void>;
    requestSaveBranchListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string }): Promise<void>;
    requestGetBranchListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string }): Promise<void>;
    requestSaveCommitListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string }): Promise<void>;
    requestGetCommitListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string }): Promise<void>;
};

const actions: ProductManageActions = {
    async requestSaveReposListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string }): Promise<void> {
        console.log("payload:", payload)

        try {
            console.log("requestSaveReposListToDjango()")
            await axiosInst.djangoAxiosInst.post("/repos/save", payload)
        } catch (error) {
            console.log("requestSaveReposListToDjango() 중 에러 발생:", error)
            throw error
        }
    },
    async requestGetReposListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string }): Promise<void> {
        console.log("payload:", payload)

        try {
            console.log("requestGetReposListToDjango()")
            const response = await axiosInst.djangoAxiosInst.post("/repos/list", payload)
            console.log("response:", response)
            const repoList = response.data.repo_list
            console.log("repoList:", repoList)
            context.commit("REQUEST_GET_REPOS_LIST_TO_DJANGO", repoList)
        } catch (error) {
            console.log("requestGetReposListToDjango() 중 에러 발생:", error)
            throw error
        }
    },
    async requestSaveBranchListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string, reponame: string }): Promise<void> {
        console.log("payload:", payload)

        try {
            console.log("requestSaveBranchListToDjango()")
            await axiosInst.djangoAxiosInst.post("/branches/save", payload)
        } catch (error) {
            console.log("requestSaveBranchListToDjango() 중 에러 발생:", error)
            throw error
        }
    },
    async requestGetBranchListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string, reponame: string }): Promise<void> {
        console.log("payload:", payload)

        try {
            console.log("requestGetBranchListToDjango()")
            const response = await axiosInst.djangoAxiosInst.post("/branches/list", payload)
            console.log("response:", response)
            const branchList = response.data.branch_list
            console.log("branchList:", branchList)
            context.commit("REQUEST_GET_BRANCH_LIST_TO_DJANGO", branchList)
        } catch (error) {
            console.log("requestGetBranchListToDjango() 중 에러 발생:", error)
            throw error
        }
    },
    async requestSaveCommitListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string, reponame: string, branchname: string }): Promise<void> {
        console.log("payload:", payload)

        try {
            console.log("requestSaveCommitListToDjango()")
            await axiosInst.djangoAxiosInst.post("/commits/save", payload)
        } catch (error) {
            console.log("requestSaveCommitListToDjango() 중 에러 발생:", error)
            throw error
        }
    },
    async requestGetCommitListToDjango(context: ActionContext<ProductManageState, any>,
        payload: { userToken: string, reponame: string, branchname: string }): Promise<void> {
        console.log("payload:", payload)

        try {
            console.log("requestGetCommitListToDjango()")
            const response = await axiosInst.djangoAxiosInst.post("/commits/list", payload)
            console.log("response:", response)
            const commitList = response.data.commit_list
            console.log("commitList:", commitList)
            context.commit("REQUEST_GET_COMMIT_LIST_TO_DJANGO", commitList)
        } catch (error) {
            console.log("requestGetCommitListToDjango() 중 에러 발생:", error)
            throw error
        }
    }
};

export default actions;
