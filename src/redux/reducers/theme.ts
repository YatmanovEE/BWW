import { Reducer } from 'react';
import { ActionTypes } from '../types';
import { IAction } from './types';

export type IReducerTheme<T> = IAction<ActionTypes.ThemeReducer, T>;

export const themeInitialState = {
	errorColor: '#EE5353',
	correctColor: '#02F232',
	shadowGeometry: '4px 4px 8px 0px',
	shadowColorSecondary: '#D0D1D2',
	bodyBackgroundColor: '#FFFFFF',
	shadowColorPrimary: '#96A3AB',
	bodyColor: '#000000',
	burgerBackgroundColor: '#FFFFFF',
	burgerColor: '#000000',
};

const funcInitialState = (): ITheme => {
	let theme = localStorage.getItem('theme');
	if (theme) {
		let ret: ITheme = JSON.parse(theme);
		return ret;
	}
	return themeInitialState;
};
export type ITheme = typeof themeInitialState;

export const reducerTheme: Reducer<
	typeof themeInitialState,
	IReducerTheme<typeof themeInitialState>
> = (state = funcInitialState(), action) => {
	switch (action.type) {
		case ActionTypes.ThemeReducer.CHANGE:
			let theme = {
				...state,
				...action.payload,
			};
			localStorage.setItem('theme', JSON.stringify(theme));
			return theme;

		default:
			return state;
	}
};
