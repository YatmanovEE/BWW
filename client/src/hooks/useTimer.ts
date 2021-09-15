import { useEffect, useState } from "react";
/**
 *
 * @param shutdownСondition Condition when timer will be is stoped
 * @param shutdownСondition Condition when timer will be is deading
 * @param duration Timer update time
 * @returns  useState Hook Tuples items for Start and End Date in obj { timerTail, setTimerTail, timerStart, setTimerStart }
 */
export const useTimer = (
	stopCondition: boolean,
	shutdownСondition: boolean,
	duration: number
) => {
	const [timerTail, setTimerTail] = useState(0);
	const [timerStart, setTimerStart] = useState(0);

	useEffect(() => {
		let timer = setInterval(() => {
			if (timerStart && !stopCondition) {
				setTimerTail((Date.now() - timerStart) / 1000);
			}
		}, duration);
		if (shutdownСondition) {
			setTimerTail(0);
			clearInterval(timer);
		}
		return () => clearInterval(timer);
	}, [duration, shutdownСondition, stopCondition, timerStart]);
	return { timerTail, setTimerTail, timerStart, setTimerStart };
};
