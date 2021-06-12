import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { createClassName } from '../modules/join';
import { useTimer } from '../hooks/useTimer';
import { ITheme, themeInitialState } from '../redux/reducers/theme';
import { IRootReducer } from '../redux/store/rootStore';
import { openModal } from '../redux/actions/modal';
import BurgerMenu from './Burger';
import { updateText, updateURL } from '../redux/actions/blackboardWithWords';
import { BlackboardWithWordsInitialState } from '../redux/reducers/blackboardWithWords';
import { changeTheme } from '../redux/actions/theme';

import {
	resetCorrector,
	changeStateCorrector,
	updateInputValue,
} from '../redux/actions/corrector';
import Timer from './Timer';
import Corrector from './Corrector';

type IStyle = {
	correct: boolean;
	timerStart: number;
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
		btn: ({ theme }: IStyle) => ({
			marginTop: '10px',
			border: `1px ${theme.shadowColorSecondary} solid`,
			boxShadow: theme.shadowGeometry + theme.shadowColorSecondary,
			transition: 'box-shadow 0.2s ease',
			'&:active': {
				boxShadow: 'none',
			},
		}),
		corrector__container: ({ correct, timerStart, theme }: IStyle) => ({
			border: timerStart
				? correct
					? ` 1px solid ${theme.correctColor}`
					: ` 1px solid ${theme.errorColor}`
				: '1px solid transparent',
			width: '300px',
			height: '300px',
			overflow: 'clip',
			cursor: 'text',
			padding: '10px',
			boxShadow: theme.shadowGeometry + theme.shadowColorPrimary,
			transition: 'box-shadow 1s ease, border 1s ease ',
			'&:hover': {
				boxShadow: theme.shadowGeometry + theme.shadowColorSecondary,
			},
		}),
		span: {},
		correct: ({ theme }: IStyle) => ({
			color: 'white',
			backgroundColor: theme.correctColor,
		}),
		error: ({ theme }: IStyle) => ({
			color: 'white',
			backgroundColor: theme.errorColor,
		}),
	},
	{ name: 'BlackboardWithWords' }
);

function createCorrector(str: string): ICorrector[] {
	let arr: ICorrector[] = [];
	if (Array.isArray(str)) {
		str = str.join(',');
	}
	str
		.slice(0, 700)
		.split('')
		.forEach((item, i) => {
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

const BlackboardWithWords: FC<Props> = ({ theme, blackBoardWithWords }) => {
	const [correct, setCorrect] = useState(true);
	const [corrector, setCorrector] = useState<ICorrector[]>(
		createCorrector(blackBoardWithWords.text)
	);

	useEffect(() => {
		setCorrector(createCorrector(blackBoardWithWords.text));
	}, [blackBoardWithWords.text]);
	const [inputValue, setInputValue] = useState('');
	const [countMistake, setCountMistake] = useState(0);
	const [urlValue, setUrlValue] = useState(blackBoardWithWords.url);
	const [textValue, setTextValue] = useState(blackBoardWithWords.text);
	const [endText, setEndText] = useState(false);
	const dispatch = useDispatch();
	let correct = corrector.correct;
	let inputValue = corrector.inputValue;

	const { timerTail, setTimerStart, timerStart } = useTimer(endText, 100);

	let inputRef = useRef<HTMLInputElement>(null);
	let className = style({
		correct,
		timerStart,
		theme,
	});
	let join = createClassName(className);

	function focusHandler() {
		refFocus(inputRef);
	}
	function reset() {
		dispatch(resetCorrector(null));
	}

	const inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.value.length <= 1) setTimerStart(Date.now());
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
				<div>Затраченное время:{timerTail}</div>
				<div className="">
					<span>Процент ошибок:</span>
					<span>
						{Math.round((countMistake / corrector.length) * 100 * 100) / 100}%
					</span>
				</div>
				<div className="">
					<span>Скорость написания в секунду:</span>
					<span>
						{Math.round((inputValue.length * 100) / timerTail) / 100 || 0}
					</span>
				</div>
				<div className="">
					<span>Скорость написания в минуту:</span>
					<span>
						{Math.round((inputValue.length * 60 * 100) / timerTail) / 100 || 0}
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
				<input
					type="text"
					value={urlValue}
					onInput={(e) => setUrlValue(e.currentTarget.value)}
				/>
				<button
					className={join('btn')}
					onClick={() => dispatch(updateURL({ url: urlValue }))}
				>
					Загрузить текст
				</button>
				<input
					type="text"
					value={textValue}
					onInput={(e) => setTextValue(e.currentTarget.value)}
				/>
				<button
					className={join('btn')}
					onClick={() => dispatch(updateText({ text: textValue }))}
				>
					Изменить текст
				</button>
				<button
					className={join('btn')}
					onClick={() => dispatch(changeTheme(themeInitialState))}
				>
					Сбросить цвета
				</button>
			</div>
			<Corrector></Corrector>
		</div>
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
export default connector(BlackboardWithWords);
