import { createUseStyles } from 'react-jss';

export const globalClassName = createUseStyles(
	{
		flex: {
			display: 'flex',
		},
		wrap: {
			flexWrap: 'wrap',
		},
		btn: {
			border: 'none',
			padding: '10px',
			backgroundColor: 'transparent',
			cursor: 'pointer',
		},
		none: {
			display: 'none',
		},
		container: {
			padding: '10px',
		},
	},
	{
		name: 'global',
	}
);
