import { FC, useEffect, useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { ITheme } from '../';
import { createClassName } from '../modules/join';

interface IStyle {
	correct: boolean;
}

let style = createUseStyles((theme: ITheme) => ({
	inputText: {
		// opacity: 0,
	},
	wrapper: ({ correct }: IStyle) => ({
		border: '1px solid',
		borderColor: correct ? 'green' : 'red',
		width: '300px',
		height: '300px',
	}),
	correct: {
		color: 'green',
	},
	error: {
		color: 'red',
	},
}));

let testArr = 'Привет как дела, как же давно не виделись';

type Props = ConnectedProps<typeof connector>;

type ICorrector = {
	count: number;
	correct: boolean;
	value: string;
};

const BlackboardWithWords: FC<Props> = ({}) => {
	const [correct, setCorrect] = useState(true);
	const [corrector, setCorrector] = useState<ICorrector[]>([
		{
			count: 0,
			correct: true,
			value: testArr[0],
		},
	]);
	const [countMistake, setCountMistake] = useState(0);
	let className = style({ correct });
	let join = createClassName(className);
	let nodeRef = useRef<HTMLInputElement>(null);
	function wrapperHandler() {
		let current = nodeRef?.current;
		if (current) {
			current.focus();
		}
	}
	useEffect(() => {
		if (correct === false) {
			setCountMistake((prev) => prev + 1);
		}
	}, [correct]);
	console.log(corrector);
	const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		let count = e.target.value.length - 1;
		let obj = {
			count,
			correct: true,
			value: e.target.value.charAt(count),
		};
		if (testArr.charAt(count) === e.target.value.charAt(count)) {
			obj.correct = true;
			setCorrect(true);
		} else {
			obj.correct = false;
			setCorrect(false);
		}
		setCorrector((prev) => prev.splice(0, count + 1, ...prev.concat(obj)));
	};
	return (
		<>
			<div className="">
				<span>Процент ошибок</span>
				<span>{(countMistake / testArr.length) * 100}%</span>
			</div>
			<input
				ref={nodeRef}
				type="text"
				name=""
				id=""
				className={join('inputText')}
				onInput={inputHandler}
			/>
			<div className={join('wrapper')} onClick={wrapperHandler}>
				{testArr.split('').map((item, key) => {
					return (
						<span
							className={join(
								'span',
								corrector[key]
									? corrector[key].correct
										? 'correct'
										: 'error'
									: ''
							)}
							key={key}
						>
							{item}
						</span>
					);
				})}
			</div>
		</>
	);
};

let connector = connect(null, null);
export default connector(BlackboardWithWords);
