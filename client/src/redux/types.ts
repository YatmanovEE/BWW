export namespace ActionTypes {
	export enum ThemeReducer {
		CHANGE = "theme/CHANGE",
	}

	export enum ModalType {
		OPEN = "modal/OPEN",
		CLOSE = "modal/CLOSE",
	}

	export enum BlackBoardWithWords {
		UPDATE_TEXT = "blackBoardWithWords/UPDATE_TEXT",
		UPDATE_URL = "blackBoardWithWords/UPDATE_URL",
		SETLOADER = "blackBoardWithWords/SETLOADER",
	}
	export enum Corrector {
		CHANGE_STATE = "corrector/CHANGE_STATE",
		UPDATE_CORRECTOR = "corrector/UPDATE_CORRECTOR",
		UPDATE_INPUT = "corrector/UPDATE_INPUT",
		RESET = "corrector/RESET",
		ADD_COUNT_MISTATE = "corrector/ADD_COUNT_MISTATE",
	}
	export enum Notice {
		SHOW_NOTICE = "NOTICE/SHOW",
		HIDE_NOTICE = "NOTICE/HIDE",
	}
}
