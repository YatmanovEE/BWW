import { FC } from "react";
import { createUseStyles } from "react-jss";
import { connect, ConnectedProps } from "react-redux";
import { createClassName } from "../modules/join";
import { ITheme } from "../redux/reducers/theme";
import { IRootReducer } from "../redux/store/rootStore";

const style = createUseStyles(
	{
		wrapper: {
			position: "absolute",
			top: 0,
			left: 0,
			padding: "1rem",
			backgroundColor: "white",
			boxShadow: (theme: ITheme) =>
				`${theme.shadowColorSecondary} ${theme.shadowGeometry}`,
			marginTop: "10px",
			transition: "box-shadow 0.2s ease 0s",
		},
	},
	{
		name: "notice",
	}
);

const Notice: FC<ConnectedProps<typeof connector>> = ({ notice, theme }) => {
	const join = createClassName(style(theme));
	if (notice.active) {
		return (
			<div className={join("wrapper")}>
				<span>{notice.text}</span>
			</div>
		);
	}
	return null;
};

const mapStateToProps = ({ notice, theme }: IRootReducer) => ({
	notice,
	theme,
});

const connector = connect(mapStateToProps);
export default connector(Notice);
