import { takeEvery, call, put } from 'redux-saga/effects';
import {
	IReducerBlackboardWithWords,
	BlackboardWithWordsState,
} from './reducers/blackboardWithWords';
import { ActionBlackBoardWithWords } from './types';

export function* sagaWatcher() {
	yield takeEvery(ActionBlackBoardWithWords.UPDATE_URL, fetchEvent);
}
function* fetchEvent({
	payload,
}: IReducerBlackboardWithWords<BlackboardWithWordsState>) {
	try {
		const data: JSON = yield call(fetchPost, payload.url);

		yield put({
			type: ActionBlackBoardWithWords.UPDATE_TEXT,
			payload: {
				...payload,
				text: data,
			},
		});
	} catch (e) {
		yield console.error(e); //for now
	}
}

async function fetchPost(url: string): Promise<JSON> {
	try {
		let response = await fetch(url);
		return response.json();
	} catch (e) {
		throw console.error(e);
	}
}
