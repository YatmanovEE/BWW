import { IModalState } from "../reducers/modal";
import { IAction } from "../reducers/types";
import { ActionTypes } from "../types";

export type IModalAction<T> = IAction<ActionTypes.ModalType, T>;

export declare type ModalAction<T> = (payload: T) => IModalAction<IModalState>;
export type IModalTypeOpen = {
	component: React.ReactElement;
};

/**
 * @param component must have a closeModal action button.
 *
 */
export const openModal: ModalAction<IModalTypeOpen> = ({ component }) => {
	return {
		type: ActionTypes.ModalType.OPEN,
		payload: {
			active: true,
			component,
		},
	};
};
export const closeModal = (): IModalAction<IModalState> => {
	return {
		type: ActionTypes.ModalType.CLOSE,
		payload: {
			active: false,
			component: null,
		},
	};
};
