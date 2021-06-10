import { ConnectedProps, connect } from 'react-redux';
import { IRootReducer } from '../redux/store/rootStore';
import { ThemeProvider } from 'react-jss';
import { FC } from 'react';

const ThemeApp: FC<ConnectedProps<typeof connector>> = ({
	theme,
	children,
}) => {
	return (
		<>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</>
	);
};

const mapStateToProps = ({ theme }: IRootReducer) => ({
	theme,
});

let connector = connect(mapStateToProps);
export default connector(ThemeApp);
