import { ChangeEventHandler, FC, useRef, useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { createClassName } from '../modules/join';
import { useTimer } from '../hooks/useTimer';
import { ITheme } from '../redux/reducers/theme';

interface IStyle {
	correct: boolean;
	dateStart: number;
}

let style = createUseStyles(
	(theme: ITheme) => ({
		main__container: {
			justifyContent: 'center',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
		inputText: {
			opacity: 0,
			position: 'absolute',
		},
		information__container: {
			flexDirection: 'column',
			justifyContent: 'flex-start',
			justifyItems: 'center',
			whiteSpace: 'nowrap',
			padding: '10px',
			width: '300px',
			overflow: 'hidden',
		},
		btn: {
			marginTop: '10px',
			border: `1px ${theme.shadowColorSecondary} solid`,
			boxShadow: theme.shadowGeometry + theme.shadowColorSecondary,
			transition: 'box-shadow 0.2s ease',
			'&:active': {
				boxShadow: 'none',
			},
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
			padding: '10px',
			boxShadow: theme.shadowGeometry + theme.shadowColorPrimary,
			transition: 'box-shadow 1s ease, border 1s ease ',
			'&:hover': {
				boxShadow: theme.shadowGeometry + theme.shadowColorSecondary,
			},
		}),
		span: {},
		correct: {
			color: 'white',
			backgroundColor: theme.greenColor,
		},
		error: {
			color: 'white',
			backgroundColor: theme.redColor,
		},
	}),
	{ name: 'BlackboardWithWords' }
);

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
function refFocus(nodeRef: React.RefObject<HTMLElement>) {
	if (nodeRef?.current) {
		nodeRef.current.focus();
	}
}

const BlackboardWithWords: FC<Props> = ({}) => {
	const [correct, setCorrect] = useState(true);
	const [corrector, setCorrector] = useState<ICorrector[]>(
		createCorrector(testArr)
	);
	const [inputValue, setInputValue] = useState('');
	const [countMistake, setCountMistake] = useState(0);
	const [endText, setEndText] = useState(false);

	const { dateEnd, setDateStart, dateStart } = useTimer(endText, 100);

	let inputRef = useRef<HTMLInputElement>(null);
	let className = style({
		correct,
		dateStart,
	});
	let join = createClassName(className);

	function focusHandler() {
		refFocus(inputRef);
	}
	function reset() {
		setCorrect(true);
		setInputValue('');
		setCountMistake(0);
		setEndText(false);
		setDateStart(0);
		setCorrector(createCorrector(testArr));
	}

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
		<div className={join('flex', 'main__container', 'container')}>
			<div className={join('information__container', 'container', 'flex')}>
				<div>Затраченное время:{dateEnd}</div>
				<div className="">
					<span>Процент ошибок:</span>
					<span>
						{Math.round((countMistake / corrector.length) * 100 * 100) / 100}%
					</span>
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
			</div>

			<div
				className={join('container', 'corrector__container')}
				onClick={focusHandler}
			>
				<input
					ref={inputRef}
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
		</div>
	);
};

let connector = connect(null, null);
export default connector(BlackboardWithWords);
