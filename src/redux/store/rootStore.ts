import { combineReducers } from 'redux';
import {
	BlackboardWithWordsState,
	reducerBlackboardWithWords,
} from '../reducers/blackboardWithWords';

import { IModalState, ModalReducer } from '../reducers/modal';
import { ITheme, reducerTheme } from '../reducers/theme';

export interface IRootReducer {
	theme: ITheme;
	modal: IModalState;
	blackBoardWithWords: BlackboardWithWordsState;
}

//TODO Найти связать интерфейс и rootReducer

export const rootReducer = combineReducers({
	theme: reducerTheme,
	modal: ModalReducer,
	blackBoardWithWords: reducerBlackboardWithWords,
});
