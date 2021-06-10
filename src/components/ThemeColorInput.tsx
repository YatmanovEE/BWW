import { FC } from 'react';
import { connect } from 'react-redux';
import { IRootReducer } from './../redux/store/rootStore';
import { ConnectedProps, useDispatch } from 'react-redux';
import { changeTheme } from '../redux/actions/theme';

const ThemeColorInput: FC<ConnectedProps<typeof connector>> = ({ theme }) => {
	const dispatch = useDispatch();
	return (
		<input
			type="color"
			onChange={(e) =>
				dispatch(changeTheme({ shadowColorPrimary: e.target.value }))
			}
		/>
	);
};

const mapStateToProps = ({ theme }: IRootReducer) => ({
	theme,
});

let connector = connect(mapStateToProps);
export default connector(ThemeColorInput);
