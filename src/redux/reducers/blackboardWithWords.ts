import { Reducer } from 'react';
import { ActionTypes } from '../types';
import { IAction } from './types';

export type IReducerBlackboardWithWords<T> = IAction<
	ActionTypes.BlackBoardWithWords,
	T
>;

export const BlackboardWithWordsInitialState = {
	text: 'Привет. URL проверялся только тот, который введен в input. ',
	url: 'https://baconipsum.com/api/?type=meat-and-filler',
	loader: false,
};
export type BlackboardWithWordsState = typeof BlackboardWithWordsInitialState;

export const funcInitialState = (): typeof BlackboardWithWordsInitialState => {
	let text = localStorage.getItem('text');
	if (text) {
		let ret: BlackboardWithWordsState = JSON.parse(text);
		return ret;
	}
	return BlackboardWithWordsInitialState;
};

export const reducerBlackboardWithWords: Reducer<
	typeof BlackboardWithWordsInitialState,
	IReducerBlackboardWithWords<typeof BlackboardWithWordsInitialState>
> = (state = funcInitialState(), action) => {
	switch (action.type) {
		case ActionTypes.BlackBoardWithWords.UPDATE_TEXT:
			let text = {
				...state,
				...action.payload,
			};

			localStorage.setItem('text', JSON.stringify(text));
			return text;
		case ActionTypes.BlackBoardWithWords.SETLOADER:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
