import { ChangeEventHandler, FC, useRef } from "react";
import { createUseStyles } from "react-jss";
import { ConnectedProps, connect, useDispatch } from "react-redux";
import { createClassName } from "../modules/join";
import {
	addCountMistake,
	changeStateCorrector,
	updateInputValue,
} from "../redux/actions/corrector";
import { ITheme } from "../redux/reducers/theme";
import { IRootReducer } from "../redux/store/rootStore";

export type Props = ConnectedProps<typeof connector>;

type IStyle = {
	theme: ITheme;
	correct: boolean;
	timerStart: boolean;
};

let style = createUseStyles(
	{
		main__container: {
			justifyContent: "center",
			marginLeft: "auto",
			marginRight: "auto",
		},
		inputText: {
			opacity: 0,
			position: "absolute",
		},
		information__container: {
			flexDirection: "column",
			justifyContent: "flex-start",
			justifyItems: "center",
			whiteSpace: "nowrap",
			padding: "10px",
			width: "300px",
			overflow: "hidden",
		},
		btn: ({ theme }: IStyle) => ({
			marginTop: "10px",
			border: `1px ${theme.shadowColorSecondary} solid`,
			boxShadow: theme.shadowGeometry + theme.shadowColorSecondary,
			transition: "box-shadow 0.2s ease",
			"&:active": {
				boxShadow: "none",
			},
		}),
		corrector__container: ({ correct, timerStart, theme }: IStyle) => ({
			border: timerStart
				? correct
					? ` 1px solid ${theme.correctColor}`
					: ` 1px solid ${theme.errorColor}`
				: "1px solid transparent",
			width: "300px",
			height: "300px",
			overflow: "clip",
			cursor: "text",
			padding: "10px",
			boxShadow: theme.shadowGeometry + theme.shadowColorPrimary,
			transition: "box-shadow 1s ease, border 1s ease ",
			"&:hover": {
				boxShadow: theme.shadowGeometry + theme.shadowColorSecondary,
			},
		}),
		span: {},
		correct: ({ theme }: IStyle) => ({
			color: "white",
			backgroundColor: theme.correctColor,
		}),
		error: ({ theme }: IStyle) => ({
			color: "white",
			backgroundColor: theme.errorColor,
		}),
	},
	{ name: "Corrector" }
);

function refFocus(nodeRef: React.RefObject<HTMLElement>) {
	if (nodeRef?.current) {
		nodeRef.current.focus();
	}
}

export const Corrector: FC<Props> = ({
	corrector,
	theme,
	blackBoardWithWords,
}) => {
	let correct = corrector.correct;
	let inputValue = corrector.inputValue;
	let correctorText = corrector.correctorText;
	let className = style({
		correct,
		theme,
		timerStart: inputValue.length > 1,
	});
	let join = createClassName(className);
	let dispatch = useDispatch();
	let inputRef = useRef<HTMLInputElement>(null);

	const inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (correctorText.length < e.target.value.length) return;
		let eValue = e.target.value[inputValue.length];
		if (correctorText[inputValue.length].value === eValue) {
			dispatch(changeStateCorrector({ correct: true }));
			correctorText[inputValue.length].correct = true;
			dispatch(updateInputValue({ inputValue: e.target.value }));
		} else {
			dispatch(changeStateCorrector({ correct: false }));
			if (correct) {
				dispatch(addCountMistake(null));
			}
			correctorText[inputValue.length].correct = false;
		}
		if (correctorText.length - 1 <= e.target.value.length) {
			return dispatch(changeStateCorrector({ endTextState: true }));
		}
	};

	return (
		<div
			className={join("container", "corrector__container")}
			onClick={() => refFocus(inputRef)}
		>
			<input
				ref={inputRef}
				type="text"
				name=""
				id=""
				className={join("inputText")}
				onInput={inputHandler}
				value={inputValue}
			/>

			{!blackBoardWithWords.loader
				? correctorText.map((item, key) => {
						return (
							<span
								className={join(
									"span",
									item.correct !== null
										? item.correct
											? "correct"
											: "error"
										: "undefined"
								)}
								key={key * Math.random()}
							>
								{item.value}
							</span>
						);
				  })
				: "Загрузка"}
		</div>
	);
};

const mapStateToProps = ({
	corrector,
	theme,
	blackBoardWithWords,
}: IRootReducer) => ({
	corrector,
	theme,
	blackBoardWithWords,
});

const connector = connect(mapStateToProps);
export default connector(Corrector);
