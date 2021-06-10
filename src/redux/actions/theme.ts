import { IReducerTheme, ITheme } from '../reducers/theme';
import { ActionThemeReducer } from '../types';

export function changeTheme<T extends Partial<ITheme>>(
	payload: T
): IReducerTheme<T> {
	return {
		type: ActionThemeReducer.CHANGE,
		payload,
	};
}
