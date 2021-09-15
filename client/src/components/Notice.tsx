import { FC, useRef } from "react";
import { createUseStyles } from "react-jss";
import { connect, ConnectedProps } from "react-redux";
import { createClassName } from "../modules/join";
import { ITheme } from "../redux/reducers/theme";
import { IRootReducer } from "../redux/store/rootStore";
import { CSSTransition } from "react-transition-group";

const DURATION = 200;

const style = createUseStyles(
	{
		wrapper: (theme: ITheme) => ({
			position: "fixed",
			top: 0,
			left: 0,
			padding: "1rem",
			backgroundColor: "white",
			boxShadow: `${theme.shadowColorSecondary} ${theme.shadowGeometry}`,
			marginTop: "10px",
			// transform: "translateY(-300%)",
			transition: `transform ${DURATION}ms ease 0s `,

			"&-enter": {
				transform: "translateY(-300%)",
			},
			"&-enter-active": {
				transform: "translateY(0%)",
			},
			"&-enter-done": {
				transform: "translateY(0%)",
			},
			"&-exit": {
				transform: "translateY(0%)",
			},
			"&-exit-active": {
				transform: "translateY(-300%)",
			},
			"&-exit-done": {
				transform: "translateY(-300%)",
			},
			"&:after": {
				position: "absolute",
				top: 0,
				left: -10,
				content: "",
				backgroundColor: "red",
				width: "2rem",
				height: "2rem",
			},
		}),
	},
	{
		name: "notice",
	}
);

const Notice: FC<ConnectedProps<typeof connector>> = ({ notice, theme }) => {
	const className = style(theme);
	const join = createClassName(className);
	const ref = useRef(null);
	return (
		<CSSTransition
			in={notice.active}
			timeout={DURATION}
			nodeRef={ref}
			classNames={className.wrapper}
			unmountOnExit
		>
			<div className={join("wrapper")} ref={ref}>
				<span>{notice.text}</span>
			</div>
		</CSSTransition>
	);
};

const mapStateToProps = ({ notice, theme }: IRootReducer) => ({
	notice,
	theme,
});

const connector = connect(mapStateToProps);
export default connector(Notice);
