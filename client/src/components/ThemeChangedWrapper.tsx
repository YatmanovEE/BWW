import { FC } from "react";
import { getGlobalName } from "../modules/join";
import { themeInitialState } from "../redux/reducers/theme";
import ThemeColorInput from "./ThemeColorInput";

export const ThemeChangedWrapper: FC = () => {
	let join = getGlobalName();
	return (
		<div className={join("container")}>
			{(
				Object.keys(themeInitialState) as Array<
					keyof typeof themeInitialState
				>
			).map((item, key) => {
				return (
					<ThemeColorInput
						keyTheme={item}
						key={key}
					></ThemeColorInput>
				);
			})}
		</div>
	);
};
