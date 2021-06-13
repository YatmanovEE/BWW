import { correctorState } from '../reducers/corrector';
import { IAction } from '../reducers/types';
import { ActionTypes } from '../types';

export type ICorrectorAction<T> = IAction<ActionTypes.Corrector, T>;

type ICorrector<T> = (payload: T) => ICorrectorAction<T>;

export const updateInputValue: ICorrector<Pick<correctorState, 'inputValue'>> =
	({ inputValue }) => {
		return {
			type: ActionTypes.Corrector.UPDATE_INPUT,
			payload: {
				inputValue,
			},
		};
	};
export const updateCorrector: ICorrector<
	Pick<correctorState, 'correctorText'>
> = ({ correctorText }) => {
	return {
		type: ActionTypes.Corrector.UPDATE_CORRECTOR,
		payload: {
			correctorText,
		},
	};
};

export const changeStateCorrector: ICorrector<
	Partial<Pick<correctorState, 'correct' | 'endTextState'>>
> = (payload) => {
	return {
		type: ActionTypes.Corrector.CHANGE_STATE,
		payload,
	};
};
export const resetCorrector: ICorrector<null> = (payload = null) => {
	return {
		type: ActionTypes.Corrector.RESET,
		payload: null,
	};
};

export const addCountMistake: ICorrector<null> = (payload = null) => {
	return {
		type: ActionTypes.Corrector.ADD_COUNT_MISTATE,
		payload: null,
	};
};
