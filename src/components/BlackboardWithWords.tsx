import { ChangeEventHandler, FC, useRef, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { ITheme } from '../';
import { createClassName } from '../modules/join';
import { useTimer } from '../hooks/useTimer';

interface IStyle {
	correct: boolean;
}

let style = createUseStyles((theme: ITheme) => ({
	inputText: {
		opacity: 0,
		position: 'absolute',
	},
	corrector__container: ({ correct, dateStart }: IStyle) => ({
		border: dateStart
			? correct
				? ` 1px solid ${theme.greenColor}`
				: ` 1px solid ${theme.redColor}`
			: '1px solid transparent',
		width: '300px',
		height: '300px',
		cursor: 'text',
	}),
	correct: {
		color: 'white',
		backgroundColor: 'green',
	},
	error: {
		color: 'white',
		backgroundColor: 'red',
	},
}));

let testArr = 'Привет как дела, как же давно не виделись';

function createCorrector(str: string): ICorrector[] {
let arr: ICorrector[] = [];
	str.split('').forEach((item, i) => {
		arr.push({
			count: i,
			correct: null,
			value: item,
		});
	});
	return arr;
}

type Props = ConnectedProps<typeof connector>;

type ICorrector = {
	count: number;
	correct: boolean | null;
	value: string;
};

const BlackboardWithWords: FC<Props> = ({}) => {
	const [correct, setCorrect] = useState(true);
	const [corrector, setCorrector] = useState<ICorrector[]>(
		createCorrector(testArr)
	);
	const [inputValue, setInputValue] = useState('');
	const [countMistake, setCountMistake] = useState(0);
	const [dateNow, setDateNow] = useState(0);
	const [dateEnd, setDateEnd] = useState(0);
	const [endText, setEndText] = useState(false);
	const { dateEnd, setDateStart, dateStart } = useTimer(endText, 100);
		dateStart,
	let join = createClassName(className);
	let nodeRef = useRef<HTMLInputElement>(null);
	function wrapperHandler() {
		if (nodeRef?.current) {
			nodeRef.current.focus();
		}
	function reset() {
		setCorrect(true);
		setInputValue('');
		setCountMistake(0);
		setEndText(false);
		setDateStart(0);
		setCorrector(createCorrector(testArr));
	}

		return () => clearInterval(timer);
	}, [dateNow, endText]);
	const inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.value.length <= 1) setDateStart(Date.now());
		if (corrector.length < e.target.value.length) return;
		let eValue = e.target.value[inputValue.length];
		if (corrector[inputValue.length].value === eValue) {
			setCorrect(true);
			corrector[inputValue.length].correct = true;
			setInputValue(e.target.value);
		} else {
			setCorrect(false);
			if (correct) {
				setCountMistake((prev) => prev + 1);
			}
			corrector[inputValue.length].correct = false;
		}
		if (corrector.length - 1 <= e.target.value.length) {
			return setEndText(true);
		}
	};
	return (
		<>
			<div>Затраченное время:{dateEnd}</div>
			<div className="">
				<span>Процент ошибок:</span>
				<span>{(countMistake / corrector.length) * 100}%</span>
			</div>
			<div className="">
				<span>Скорость написания в секунду:</span>
				<span>
					{Math.round((inputValue.length * 100) / dateEnd) / 100 || 0}
				</span>
			</div>
			<div className="">
				<span>Скорость написания в минуту:</span>
				<span>
					{Math.round((inputValue.length * 60 * 100) / dateEnd) / 100 || 0}
				</span>
			</div>
				<button className={join('btn')} onClick={() => reset()}>
					Сбросить
				</button>

			<div className={join('wrapper')} onClick={wrapperHandler}>
				<input
					ref={nodeRef}
					type="text"
					name=""
					id=""
					className={join('inputText')}
					onInput={inputHandler}
					value={inputValue}
				/>
				{corrector.map((item, key) => {
					return (
						<span
							className={join(
								'span',
								item.correct !== null
									? item.correct
										? 'correct'
										: 'error'
									: 'undefined'
							)}
							key={key * Math.random()}
						>
							{item.value}
						</span>
					);
				})}
			</div>
		</>
	);
};

let connector = connect(null, null);
export default connector(BlackboardWithWords);
