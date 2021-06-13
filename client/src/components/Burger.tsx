import { connect, ConnectedProps } from 'react-redux';
import { FC } from 'react';
import { IRootReducer } from '../redux/store/rootStore';
import { ThemeChangedWrapper } from './ThemeChangedWrapper';
import { createUseStyles } from 'react-jss';
import { ITheme } from '../redux/reducers/theme';

type Props = ConnectedProps<typeof connector>;
let style = createUseStyles({
	burgerMenu: (theme: ITheme) => ({
		width: '300px',
		height: '100%',
		backgroundColor: theme.burgerBackgroundColor,
		color: theme.burgerColor,
	}),
});
export const BurgerMenu: FC<Props> = ({ theme }) => {
	let className = style(theme);
	return (
		<div className={className.burgerMenu}>
			<ThemeChangedWrapper></ThemeChangedWrapper>
		</div>
	);
};

const mapStateToProps = ({ theme }: IRootReducer) => ({
	theme,
});

let connector = connect(mapStateToProps);
export default connector(BurgerMenu);
