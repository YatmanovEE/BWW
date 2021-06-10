import { FC } from 'react';
import { ITheme, themeInitialState } from '../redux/reducers/theme';
import ThemeColorInput from './ThemeColorInput';
import { createUseStyles } from 'react-jss';

export const ThemeChangedWrapper: FC = () => {
	return (
		<div>
			{(
				Object.keys(themeInitialState) as Array<keyof typeof themeInitialState>
			).map((item, key) => {
				return <ThemeColorInput keyTheme={item} key={key}></ThemeColorInput>;
			})}
		</div>
	);
};
