import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'react-jss';
const theme = {
	border: '1px solid #E1E1E1',
	backgroundColor: '#FBFBFB',
	filterBorderColor__active: '#4583CC',
	borderColor: '#E1E1E1',
	boxShadow: '0px 4px 12px #E5E5E5',
	grey: '#E5E5E5',
	shadowOffset: '0px 4px 12px',
	white: 'white',
	shadowBlack: 'rgba(0, 0, 0, 0.2)',
	secondaryBackground: '0px 4px 12px rgba(0, 0, 0, 0.16)',
	linkColor: '#2F80ED',
	placeHolderColor: '#828282',
};

export type ITheme = typeof theme;
ReactDOM.render(
	<React.StrictMode>
		<Provider store={mountStore}>
		<App />
			</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
