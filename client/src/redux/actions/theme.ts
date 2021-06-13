import { IReducerTheme, ITheme } from '../reducers/theme';
import { ActionTypes } from '../types';

export function changeTheme<T extends Partial<ITheme>>(
	payload: T
): IReducerTheme<T> {
	return {
		type: ActionTypes.ThemeReducer.CHANGE,
		payload,
	};
}
