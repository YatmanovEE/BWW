import { Reducer } from "react";
import { ICorrectorAction } from "../actions/corrector";
import { ActionTypes } from "../types";
import {
	BlackboardWithWordsInitialState,
	funcInitialState,
} from "./blackboardWithWords";
type ICorrector = {
	count: number;
	correct: boolean | null | "ready";
	value: string;
};

export type correctorState = {
	correct: boolean;
	correctorText: ICorrector[];
	inputValue: string;
	countMistake: number;
	endTextState: boolean;
};

let initialState: correctorState = {
	correct: false,
	correctorText: createCorrector(funcInitialState().text),
	inputValue: "",
	countMistake: 0,
	endTextState: false,
};

export type IReducerCorrector<T> = Reducer<T, ICorrectorAction<T>>;

function createCorrector(str: string): ICorrector[] {
	let arr: ICorrector[] = [];
	if (Array.isArray(str)) {
		str = str.join(",");
	}
	str.slice(0, 700)
		.split("")
		.forEach((item, i) => {
			if (i === 0) arr.push({ count: i, correct: "ready", value: item });
			else {
				arr.push({
					count: i,
					correct: null,
					value: item,
				});
			}
		});
	return arr;
}

export const reducerCorrector: IReducerCorrector<correctorState> = (
	state = initialState,
	action
) => {
	switch (action.type) {
		case ActionTypes.Corrector.CHANGE_STATE:
			return {
				...state,
				...action.payload,
			};
		case ActionTypes.Corrector.UPDATE_CORRECTOR:
			return {
				...state,
				correctorText: createCorrector(action.payload.inputValue),
			};
		case ActionTypes.Corrector.UPDATE_INPUT: {
			return {
				...state,
				inputValue: action.payload.inputValue,
			};
		}
		case ActionTypes.Corrector.ADD_COUNT_MISTATE: {
			return {
				...state,
				countMistake: ++state.countMistake,
			};
		}
		case ActionTypes.Corrector.RESET: {
			return {
				...initialState,
				correctorText: createCorrector(
					BlackboardWithWordsInitialState.text
				),
			};
		}

		default:
			return state;
	}
};
