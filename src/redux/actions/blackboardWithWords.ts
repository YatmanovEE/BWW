import {
	BlackboardWithWordsState,
	IReducerBlackboardWithWords,
} from '../reducers/blackboardWithWords';
import { ActionBlackBoardWithWords } from '../types';

export function updateText<T extends Partial<BlackboardWithWordsState>>(
	payload: T
): IReducerBlackboardWithWords<T> {
	return {
		type: ActionBlackBoardWithWords.UPDATE_TEXT,
		payload: {
			...payload,
			text: payload.text,
		},
	};
}
export function updateURL<T extends Partial<BlackboardWithWordsState>>(
	payload: T
): IReducerBlackboardWithWords<T> {
	return {
		type: ActionBlackBoardWithWords.UPDATE_URL,
		payload: {
			...payload,
			url: payload.url,
		},
	};
}
