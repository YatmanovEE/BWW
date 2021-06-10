import { globalStyle } from './App.global.styled';
import { registryGlobalName } from './modules/join';
import BlackboardWithWords from './components/BlackboardWithWords';
import ThemeColorInput from './components/ThemeColorInput';
import ThemeApp from './components/ThemeApp';

const App = () => {
	let className = globalStyle();
	registryGlobalName(className);
	return (
		<>
			<ThemeApp>
				<ThemeColorInput></ThemeColorInput>
				<BlackboardWithWords></BlackboardWithWords>
			</ThemeApp>
		</>
	);
};

export default App;
