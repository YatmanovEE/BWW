import { IModalState } from '../reducers/modal';
import { IAction } from '../reducers/types';
import { ActionModalType } from '../types';

export type IModalAction<T> = IAction<ActionModalType, T>;

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
		type: ActionModalType.OPEN,
		payload: {
			active: true,
			component,
		},
	};
};
export const closeModal = (): IModalAction<IModalState> => {
	return {
		type: ActionModalType.CLOSE,
		payload: {
			active: false,
			component: null,
		},
	};
};
