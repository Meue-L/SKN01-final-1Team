import { ActionContext } from "vuex";
import { Review, ReviewState } from "./states";
import { AxiosResponse } from "axios";
import { REQUEST_REVIEW_LIST_TO_DJANGO } from "./mutation-types";
import axiosInst from "@/utility/axiosInstance";

export type ReviewActions = {
	requestReviewListToDjango(
		context: ActionContext<any, any>,
		payload: { pagination: number; perPage: number }
	): Promise<void>;
	requestEntireReviewListCount(
		context: ActionContext<any, any>
	): Promise<void>;
	requestRegisterFreeFormReviewToDjango(
		context: ActionContext<any, any>,
		payload: { title: string; userToken: string; content: string }
	): Promise<void>;
	requestRegisterSelectionFormReviewToDjango(
		context: ActionContext<any, any>,
		payload: { userToken: string; ratingList: [number]; content: string }
	): Promise<void>;
};

const actions: ReviewActions = {
	async requestReviewListToDjango(
		context: ActionContext<any, any>,
		payload: { pagination: number; perPage: number }
	): Promise<void> {
		try {
			console.log("payload", payload);
			const res = await axiosInst.djangoAxiosInst.post(
				"/review/list",
				payload
			);
			return res.data.list;
		} catch (error) {
			console.error("requestReviewListToDjango():" + error);
			throw error;
		}
	},
	async requestEntireReviewListCount(
		context: ActionContext<any, any>
	): Promise<void> {
		try {
			console.log("getting list initializing");
			const res = await axiosInst.djangoAxiosInst.post(
				"/review/entire-count"
			);
			console.log("entirecount", res.data);
			return res.data.count;
		} catch (error) {
			console.error("requestEntireReviewListCount():" + error);
			throw error;
		}
	},
	async requestRegisterFreeFormReviewToDjango(
		context: ActionContext<any, any>,
		payload: { title: string; userToken: string; content: string }
	): Promise<void> {
		try {
			console.log("requesting register your review!");
			await axiosInst.djangoAxiosInst.post(
				"/review/register/writingReview",
				payload
			);
		} catch (error) {
			console.error("error occured while registering!" + error);
			throw error;
		}
	},
	async requestRegisterSelectionFormReviewToDjango(
		context: ActionContext<any, any>,
		payload: { userToken: string; ratingList: [number]; content: string }
	): Promise<void> {
		try {
			console.log("requesting register your review!");
			await axiosInst.djangoAxiosInst.post(
				"/review/register/selectionReview",
				payload
			);
		} catch (error) {
			console.error("error occured while registering!" + error);
			throw error;
		}
	},
};

export default actions;
