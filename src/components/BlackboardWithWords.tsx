import {
	ChangeEventHandler,
	FC,
	SyntheticEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { ITheme } from '../';
import { createClassName } from '../modules/join';

interface IStyle {
	correct: boolean;
}

let style = createUseStyles((theme: ITheme) => ({
	inputText: {
		opacity: 0,
		position: 'absolute',
	},
	wrapper: ({ correct }: IStyle) => ({
		border: '1px solid',
		borderColor: correct ? 'green' : 'red',
		width: '300px',
		height: '300px',
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

let arr: ICorrector[] = [];

let testArr = 'Привет как дела, как же давно не виделись'
	.split('')
	.forEach((item, i) => {
		arr.push({
			count: i,
			correct: null,
			value: item,
		});
	});

type Props = ConnectedProps<typeof connector>;

type ICorrector = {
	count: number;
	correct: boolean | null;
	value: string;
};

const BlackboardWithWords: FC<Props> = ({}) => {
	const [correct, setCorrect] = useState(true);
	const [corrector] = useState<ICorrector[]>(() => arr);
	const [inputValue, setInputValue] = useState('');
	const [countMistake, setCountMistake] = useState(0);
	let className = style({ correct });
	let join = createClassName(className);
	let nodeRef = useRef<HTMLInputElement>(null);
	function wrapperHandler() {
		if (nodeRef?.current) {
			nodeRef.current.focus();
		}
	}
	const inputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (corrector.length <= inputValue.length) return;

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
	};
	return (
		<>
			<div className="">
				<span>Процент ошибок:</span>
				<span>{(countMistake / corrector.length) * 100}%</span>
			</div>
			<input
				ref={nodeRef}
				type="text"
				name=""
				id=""
				className={join('inputText')}
				onInput={inputHandler}
				value={inputValue}
			/>

			<div className={join('wrapper')} onClick={wrapperHandler}>
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
