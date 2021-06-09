import React from 'react';
import ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import App from './App';
import { IRootReducer, rootReducer } from './redux/store/rootStore';
import reportWebVitals from './reportWebVitals';
import composeWithDevTools from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';

const theme = {
	redColor: 'rgba(255, 51, 51, 0.699)',
	greenColor: 'rgba(53, 238, 68, 0.685)',
	shadowGeometry: '7px 11px 19px 1px',
	shadowColorSecondary: ' rgba(40, 86, 122, 0.05)',
	shadowColorPrimary: ' rgba(40, 86, 122, 0.23)',
};

export type ITheme = typeof theme;

const sagaMiddleware = createSagaMiddleware();

function store(initialState: IRootReducer): Store<IRootReducer> {
	return createStore(
		rootReducer
		// composeWithDevTools(applyMiddleware(sagaMiddleware))
	);
}

let init: any = {};

let mountStore = store(init);
// sagaMiddleware.run(sagaWatcher);
ReactDOM.render(
	<React.StrictMode>
		<Provider store={mountStore}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
