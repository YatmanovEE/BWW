import { ConnectedProps, connect } from "react-redux";
import { IRootReducer } from "../redux/store/rootStore";
import { ThemeProvider } from "react-jss";
import { FC } from "react";
import { globalStyle } from "../App.global.styled";

const ThemeApp: FC<ConnectedProps<typeof connector>> = ({
	theme,
	children,
}) => {
	return (
		<>
			<ThemeProvider theme={{ ...theme }}>
				<AppProvider>{children}</AppProvider>
			</ThemeProvider>
		</>
	);
};
// TODO При использовании ThemeProvider утечка памяти, стили добавляются в дом бесконтрольно

const AppProvider: FC = ({ children }) => {
	globalStyle();

	return <>{children}</>;
};
const mapStateToProps = ({ theme }: IRootReducer) => ({
	theme,
});

let connector = connect(mapStateToProps);
export default connector(ThemeApp);
