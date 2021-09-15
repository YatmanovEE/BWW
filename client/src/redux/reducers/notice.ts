import { INoticeAction } from "./../actions/notice";
import { Reducer } from "react";
import { IModalAction } from "../actions/modal";
import { ActionTypes } from "../types";

export interface INoticeState {
	active: boolean;
	text: string;
}

const initialState: INoticeState = {
	active: false,
	text: "",
};

export type IModalReducer = INoticeState;

export const noticeReducer: Reducer<
	INoticeState,
	INoticeAction<INoticeState>
> = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.Notice.SHOW_NOTICE:
			return {
				...state,
				...action.payload,
			};
		case ActionTypes.Notice.HIDE_NOTICE:
			return {
				...state,
				active: action.payload.active,
			};
		default:
			return state;
	}
};
