import { useEffect, useState } from 'react';
/**
 *
 * @param shutdownСondition Condition when timer will be is deading
 * @param duration Timer update time
 * @returns  useState Hook Tuples items for Start and End Date in obj { dateEnd, setDateEnd, dateStart, setDateStart }
 */
export const useTimer = (shutdownСondition: boolean, duration: number) => {
	const [dateEnd, setDateEnd] = useState(0);
	const [dateStart, setDateStart] = useState(0);

	useEffect(() => {
		let timer = setInterval(() => {
			if (dateStart) {
				setDateEnd((Date.now() - dateStart) / 1000);
			}
		}, duration);
		if (shutdownСondition) {
			clearInterval(timer);
		}
		return () => clearInterval(timer);
	});
	return { dateEnd, setDateEnd, dateStart, setDateStart };
};
