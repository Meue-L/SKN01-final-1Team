import { ActionContext } from "vuex";
import { AuthenticationState } from "./states";
import axios, { AxiosResponse } from "axios";
import axiosInst from "@/utility/axiosInstance";
import {REQUEST_IS_AUTHENTICATED_TO_DJANGO} from "./mutation-types"

export type AuthenticationActions = {
  requestGithubOauthRedirectionToDjango(): Promise<void>;
  requestAccessTokenToDjangoRedirection(
    context: ActionContext<AuthenticationState, any>,
    payload: { code: string }
  ): Promise<void>;
  requestLogoutToDjango({commit}: ActionContext<AuthenticationState, any>): Promise<any>;
};

const actions: AuthenticationActions = {
  async requestGithubOauthRedirectionToDjango(): Promise<void> {
    return axiosInst.djangoAxiosInst.get("/github-oauth/github").then((res) => {
      window.location.href = res.data.url;
    });
  },
  async requestAccessTokenToDjangoRedirection(
    context: ActionContext<AuthenticationState, any>,
    payload: { code: string }
  ): Promise<void> {
    try {
      console.log("requestAccessTokenToDjangoRedirection()");
      const { code } = payload;

      const response = await axiosInst.djangoAxiosInst.post(
        "/github-oauth/github/access-token",
        { code }
      );
      console.log("response:", response);
      context.commit("REQUEST_IS_AUTHENTICATED_TO_DJANGO", true);
      return response.data
    } catch (error) {
      console.log("Access Token 요청 중 문제 발생:", error);
      throw error;
    }
  },
  async requestLogoutToDjango({commit, state}: ActionContext<AuthenticationState, any>):Promise<any> {
    try {
        const userToken = localStorage.getItem("userToken");
        const res = await axiosInst.djangoAxiosInst.post("/github-oauth/github/logout", {userToken: userToken})
        console.log("res:", res)
        commit("REQUEST_IS_AUTHENTICATED_TO_DJANGO", false);
        window.location.reload();
    } catch (error) {
        alert("로그아웃 실패");
        throw error;
    }
  },
};

export default actions;
