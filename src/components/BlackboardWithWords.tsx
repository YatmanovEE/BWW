import { ChangeEventHandler, FC, useRef, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { createClassName } from '../modules/join';
import { useTimer } from '../hooks/useTimer';
import { ITheme } from '../redux/reducers/theme';
import { IRootReducer } from '../redux/store/rootStore';
import { openModal } from '../redux/actions/modal';
import BurgerMenu from './Burger';

type IStyle = {
	correct: boolean;
	dateStart: number;
	theme: ITheme;
};

let style = createUseStyles(
	{
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
		btn: ({ theme }) => ({
			marginTop: '10px',
			border: `1px ${theme.shadowColorSecondary} solid`,
			boxShadow: theme.shadowGeometry + theme.shadowColorSecondary,
			transition: 'box-shadow 0.2s ease',
			'&:active': {
				boxShadow: 'none',
			},
		}),
		corrector__container: ({ correct, dateStart, theme }: IStyle) => ({
			border: dateStart
				? correct
					? ` 1px solid ${theme.correctColor}`
					: ` 1px solid ${theme.errorColor}`
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
		correct: ({ theme }) => ({
			color: 'white',
			backgroundColor: theme.correctColor,
		}),
		error: ({ theme }) => ({
			color: 'white',
			backgroundColor: theme.errorColor,
		}),
	},
	{ name: 'BlackboardWithWords' }
);

let testArr =
	'Привет как дела, как же давно не виделисьПривет как дела, как же давно не виделисьПривет как дела, как же давно не виделисьПривет как дела, как же давно не виделисьПривет как дела, как же давно не виделисьПривет как дела, как же давно не виделись';

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

const BlackboardWithWords: FC<Props> = ({ theme }) => {
	const [correct, setCorrect] = useState(true);
	const [corrector, setCorrector] = useState<ICorrector[]>(
		createCorrector(testArr)
	);
	const [inputValue, setInputValue] = useState('');
	const [countMistake, setCountMistake] = useState(0);
	const [endText, setEndText] = useState(false);
	const dispatch = useDispatch();

	const { dateEnd, setDateStart, dateStart } = useTimer(endText, 100);

	let inputRef = useRef<HTMLInputElement>(null);
	let className = style({
		correct,
		dateStart,
		theme,
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
		<div className={join('flex', 'main__container', 'container', 'wrap')}>
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
				<button
					className={join('btn')}
					onClick={() => dispatch(openModal({ component: <BurgerMenu /> }))}
				>
					Открыть настройки
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

const mapStateToProps = ({ theme }: IRootReducer) => ({
	theme,
});

let connector = connect(mapStateToProps);
export default connector(BlackboardWithWords);
