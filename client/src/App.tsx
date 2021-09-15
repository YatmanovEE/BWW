import { getGlobalName, registryGlobalName } from "./modules/join";
import BlackboardWithWords from "./components/BlackboardWithWords";
import ThemeApp from "./components/ThemeApp";
import { ThemeChangedWrapper } from "./components/ThemeChangedWrapper";
import { globalClassName } from "./App.global.className";
import Modal from "./components/Modal";
import Notice from "./components/Notice";

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
			<Notice></Notice>
		</>
	);
};

export default App;
