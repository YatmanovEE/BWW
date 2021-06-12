import { Reducer } from 'react';
import { IModalAction } from '../actions/modal';
import { ActionTypes } from '../types';

export interface IModalState {
	active: boolean;
	component: React.ReactElement | null;
}

const initialState: IModalState = {
	active: false,
	component: null,
};

export type IModalReducer = IModalState;

export const ModalReducer: Reducer<IModalState, IModalAction<IModalReducer>> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case ActionTypes.ModalType.OPEN:
			return {
				...state,
				...action.payload,
			};
		case ActionTypes.ModalType.CLOSE:
			return {
				...state,
				active: action.payload.active,
			};
		default:
			return state;
	}
};
