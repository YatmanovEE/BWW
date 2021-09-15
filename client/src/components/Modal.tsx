import React, { ReactChild, useEffect } from "react";
import { FC } from "react";
import { createUseStyles } from "react-jss";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { closeModal } from "../redux/actions/modal";
import { ITheme } from "../redux/reducers/theme";
import { IRootReducer } from "../redux/store/rootStore";
import { AnimatedPortal } from "./AnimatedPortal";

namespace IModal {
	export interface Props extends ConnectedProps<typeof connector> {
		children?: ReactChild;
	}
	export const Style = createUseStyles(
		(theme: ITheme) => ({
			wrapper: (duration: number) => ({
				position: "fixed",
				left: "0px",
				top: "0px",
				transform: "translateX(-300%)",
				"&-enter": {
					transform: "translateX(-300%)",
				},
				"&-enter-active": {
					transform: "translateX(0%)",
					transition: `transform ${duration}ms`,
				},
				"&-enter-done": {
					transform: "translateX(0%)",
				},
				"&-exit": {
					transform: "translateX(0%)",
				},
				"&-exit-active": {
					transform: "translateX(-300%)",
					transition: `transform ${duration}ms`,
				},
			}),
			container: {
				display: "flex",
				height: "100%",
			},
		}),
		{ name: "Modal" }
	);
}

const Modal: FC<IModal.Props> = ({ modal }) => {
	let duration = 200;
	let className = IModal.Style(duration);
	let dispatch = useDispatch();
	const node: React.RefObject<HTMLDivElement> = React.createRef();
	useEffect(() => {
		function closeModalhandler(event: Event) {
			if (!modal.active) return;
			if (node.current && !event.composedPath().includes(node.current)) {
				dispatch(closeModal());
			}
		}
		document.body.addEventListener("click", closeModalhandler);
		return () => {
			document.body.removeEventListener("click", closeModalhandler);
		};
	}, [dispatch, modal.active, node]);

	if (modal.active)
		return (
			<AnimatedPortal
				whereElem={document.body}
				duration={duration}
				activeState={modal.active}
				nodeRef={node}
				className={className.wrapper}
			>
				<div className={className.wrapper} ref={node}>
					<div className={className.container}>{modal.component}</div>
				</div>
			</AnimatedPortal>
		);
	return null;
};

const mapStateToProps = ({ modal }: IRootReducer) => ({
	modal,
});

const connector = connect(mapStateToProps);
export default connector(Modal);
