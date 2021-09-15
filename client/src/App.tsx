import { getGlobalName, registryGlobalName } from "./modules/join";
import BlackboardWithWords from "./components/BlackboardWithWords";
import ThemeApp from "./components/ThemeApp";
import { ThemeChangedWrapper } from "./components/ThemeChangedWrapper";
import { globalClassName } from "./App.global.className";
import Modal from "./components/Modal";

const App = () => {
	let className = globalClassName();
	registryGlobalName(className);
	let join = getGlobalName();
	return (
		<>
			<ThemeApp>
				<div className={join("flex", "wrap")}>
					<BlackboardWithWords></BlackboardWithWords>
				</div>
			</ThemeApp>
			<Modal></Modal>
		</>
	);
};

export default App;
