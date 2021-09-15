import { INoticeState } from "./../reducers/notice";
import { IAction } from "../reducers/types";
import { ActionTypes } from "../types";

export type INoticeAction<T> = IAction<ActionTypes.Notice, T>;

export declare type NoticeAction<T> = (
	payload: T
) => INoticeAction<INoticeState>;

export const showNotice: NoticeAction<Pick<INoticeState, "text">> = ({
	text,
}) => {
	return {
		type: ActionTypes.Notice.SHOW_NOTICE,
		payload: {
			active: true,
			text,
		},
	};
};
export const closeNotice = (): INoticeAction<INoticeState> => {
	return {
		type: ActionTypes.Notice.HIDE_NOTICE,
		payload: {
			active: false,
			text: "",
		},
	};
};
