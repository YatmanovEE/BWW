import { createUseStyles } from "react-jss";
import { ITheme } from "./redux/reducers/theme";

export const globalStyle = createUseStyles((theme: ITheme) => ({
	"@global": {
		body: {
			backgroundColor: theme.bodyBackgroundColor,
			color: theme.bodyColor,
		},
		a: {
			outline: "none",
			textDecoration: "none",
		},
	},
}));
