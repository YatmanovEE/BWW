import { FC } from "react";
import { createUseStyles } from "react-jss";
import { connect, ConnectedProps } from "react-redux";
import { createClassName } from "../modules/join";
import { IRootReducer } from "../redux/store/rootStore";

const style = createUseStyles(
	{
		wrapper: {
			position: "absolute",
			top: 0,
			right: "50%",
		},
	},
	{
		name: "notice",
	}
);

const Notice: FC<ConnectedProps<typeof connector>> = ({ notice }) => {
	const join = createClassName(style());
	if (notice.active) {
		return (
			<div className={join("wrapper")}>
				<span>{notice.text}</span>
			</div>
		);
	}
	return null;
};

const mapStateToProps = ({ notice }: IRootReducer) => ({
	notice,
});

const connector = connect(mapStateToProps);
export default connector(Notice);
