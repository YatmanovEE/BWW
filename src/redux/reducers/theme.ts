import { Reducer } from 'react';
import { ActionThemeReducer } from '../types';
import { IAction } from './types';

export type IReducerTheme<T> = IAction<ActionThemeReducer, T>;

const initialState = {
	redColor: 'rgba(255, 51, 51, 0.699)',
	greenColor: 'rgba(53, 238, 68, 0.685)',
	shadowGeometry: '7px 11px 19px 1px',
	shadowColorSecondary: ' rgba(40, 86, 122, 0.05)',
	shadowColorPrimary: ' rgba(40, 86, 122, 0.23)',
};
export type ITheme = typeof initialState;

export const reducerTheme: Reducer<
	typeof initialState,
	IReducerTheme<typeof initialState>
> = (state = initialState, action) => {
	switch (action.type) {
		case ActionThemeReducer.CHANGE:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
