import { globalStyle } from './App.global.styled';
import { registryGlobalName } from './modules/join';
import BlackboardWithWords from './components/BlackboardWithWords';

function App() {
	let className = globalStyle();
	registryGlobalName(className);
	return <BlackboardWithWords></BlackboardWithWords>;
}

export default App;
