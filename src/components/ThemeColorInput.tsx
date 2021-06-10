import { FC } from 'react';
import { connect } from 'react-redux';
import { IRootReducer } from './../redux/store/rootStore';
import { ConnectedProps, useDispatch } from 'react-redux';
import { changeTheme } from '../redux/actions/theme';
import { ITheme } from '../redux/reducers/theme';
import { createClassName } from '../modules/join';
import { createUseStyles } from 'react-jss';
type Props = ConnectedProps<typeof connector> & {
	keyTheme: string & keyof ITheme;
	title?: string;
};

const style = createUseStyles({
	container: {
		'&>span': {
			margin: '10px',
		},
		alignItems: 'center',
	},
});
const ThemeColorInput: FC<Props> = ({ theme, keyTheme, title }) => {
	const dispatch = useDispatch();
	let className = style();
	let join = createClassName(className);
	if (!parseInt(theme[keyTheme])) {
		return (
			<div className={join('flex', 'container')}>
				<input
					type="color"
					value={theme[keyTheme]}
					onInput={(e) =>
						dispatch(changeTheme({ [keyTheme]: e.currentTarget.value }))
					}
				/>
				<span>{title || keyTheme}</span>
			</div>
		);
	} else {
		return null;
	}
};

const mapStateToProps = ({ theme }: IRootReducer) => ({
	theme,
});

let connector = connect(mapStateToProps);
export default connector(ThemeColorInput);
