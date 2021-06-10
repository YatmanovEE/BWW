import { registryGlobalName } from './modules/join';
import BlackboardWithWords from './components/BlackboardWithWords';
import ThemeApp from './components/ThemeApp';
import { ThemeChangedWrapper } from './components/ThemeChangedWrapper';
import { globalClassName } from './App.global.className';

const App = () => {
	let className = globalClassName();
	registryGlobalName(className);
	return (
		<>
			<ThemeApp>
				<div className={className.flex}>
					<ThemeChangedWrapper></ThemeChangedWrapper>
					<BlackboardWithWords></BlackboardWithWords>
				</div>
			</ThemeApp>
		</>
	);
};

export default App;
