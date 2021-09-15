import { FC, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { connect, ConnectedProps } from "react-redux";
import { IRootReducer } from "../redux/store/rootStore";

type Props = ConnectedProps<typeof connector>;

const Timer: FC<Props> = ({ corrector }) => {
	const { timerTail, setTimerStart } = useTimer(
		corrector.endTextState || !corrector.active,
		100
	);
	let inputValue = corrector.inputValue;
	useEffect(() => {
		if (inputValue.length === 1) setTimerStart(Date.now());
		if (inputValue.length < 1) setTimerStart(0);
	}, [inputValue, setTimerStart]);
	return (
		<>
			<div>Затраченное время:{timerTail}</div>
			<div className="">
				<span>Процент ошибок:</span>
				<span>
					{Math.round(
						(corrector.countMistake /
							corrector.correctorText.length) *
							100 *
							100
					) / 100}
					%
				</span>
			</div>
			<div className="">
				<span>Скорость написания в секунду:</span>
				<span>
					{Math.round((inputValue.length * 100) / timerTail) / 100 ||
						0}
				</span>
			</div>
			<div className="">
				<span>Скорость написания в минуту:</span>
				<span>
					{Math.round((inputValue.length * 60 * 100) / timerTail) /
						100 || 0}
				</span>
			</div>
		</>
	);
};

const mapStateToProps = ({
	theme,
	blackBoardWithWords,
	corrector,
}: IRootReducer) => ({
	theme,
	blackBoardWithWords,
	corrector,
});

let connector = connect(mapStateToProps);
export default connector(Timer);
