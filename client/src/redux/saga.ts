import { takeEvery, call, put } from 'redux-saga/effects';
import {
	IReducerBlackboardWithWords,
	BlackboardWithWordsState,
} from './reducers/blackboardWithWords';
import { ActionTypes } from './types';

export function* sagaWatcher() {
	yield takeEvery(ActionTypes.BlackBoardWithWords.UPDATE_URL, updateText);
	yield takeEvery(ActionTypes.BlackBoardWithWords.UPDATE_TEXT, updateCorrect);
}

function* updateCorrect({
	payload,
}: IReducerBlackboardWithWords<BlackboardWithWordsState>) {
	try {
		yield put({
			type: ActionTypes.Corrector.RESET,
			payload,
		});
		yield put({
			type: ActionTypes.Corrector.UPDATE_CORRECTOR,
			payload: {
				inputValue: payload.text,
			},
		});
	} catch (e) {
		yield console.error(e);
	}
}

function* updateText({
	payload,
}: IReducerBlackboardWithWords<BlackboardWithWordsState>) {
	try {
		yield put({
			type: ActionTypes.BlackBoardWithWords.SETLOADER,
			payload: {
				loader: true,
			},
		});
		const data: JSON = yield call(fetchJSON, payload.url);
		yield put({
			type: ActionTypes.BlackBoardWithWords.SETLOADER,
			payload: {
				loader: false,
			},
		});
		yield put({
			type: ActionTypes.BlackBoardWithWords.UPDATE_TEXT,
			payload: {
				...payload,
				text: data,
			},
		});
	} catch (e) {
		yield console.error(e); //for now
	}
}
async function fetchJSON(url: string): Promise<JSON> {
	try {
		let response = await fetch(url);
		return response.json();
	} catch (e) {
		throw console.error(e);
	}
}
