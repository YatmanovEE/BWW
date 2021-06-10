import { combineReducers } from 'redux';
import { ITheme, reducerTheme } from '../reducers/theme';

export interface IRootReducer {
	theme: ITheme;
}

//TODO Найти связать интерфейс и rootReducer

export const rootReducer = combineReducers({
	theme: reducerTheme,
});
