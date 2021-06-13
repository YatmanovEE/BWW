import { Reducer } from 'react';
import { ICorrectorAction } from '../actions/corrector';
import { ActionTypes } from '../types';
import {
	BlackboardWithWordsInitialState,
	funcInitialState,
} from './blackboardWithWords';
type ICorrector = {
	count: number;
	correct: boolean | null;
	value: string;
};

export type correctorState = {
	correct: boolean;
	correctorText: ICorrector[];
	inputValue: string;
	countMistake: number;
	endTextState: boolean;
};

let initialState: correctorState = {
	correct: false,
	correctorText: createCorrector(funcInitialState().text),
	inputValue: '',
	countMistake: 0,
	endTextState: false,
};

export type IReducerCorrector<T> = Reducer<T, ICorrectorAction<T>>;

function createCorrector(str: string): ICorrector[] {
	let arr: ICorrector[] = [];
	if (Array.isArray(str)) {
		str = str.join(',');
	}
	str
		.slice(0, 700)
		.split('')
		.forEach((item, i) => {
			arr.push({
				count: i,
				correct: null,
				value: item,
			});
		});
	return arr;
}

export const reducerCorrector: IReducerCorrector<correctorState> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case ActionTypes.Corrector.CHANGE_STATE:
			return {
				...state,
				...action.payload,
			};
		case ActionTypes.Corrector.UPDATE_CORRECTOR:
			return {
				...state,
				correctorText: createCorrector(action.payload.inputValue),
			};
		case ActionTypes.Corrector.UPDATE_INPUT: {
			return {
				...state,
				inputValue: action.payload.inputValue,
			};
		}
		case ActionTypes.Corrector.ADD_COUNT_MISTATE: {
			return {
				...state,
				countMistake: ++state.countMistake,
			};
		}
		case ActionTypes.Corrector.RESET: {
			return {
				...initialState,
				correctorText: createCorrector(BlackboardWithWordsInitialState.text),
			};
		}

		default:
			return state;
	}
};
