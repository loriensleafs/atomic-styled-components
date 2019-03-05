import { useContext } from 'react';
import ThemeContext from './ThemeContext';

function useTheme() {
	const { theme } = useContext(ThemeContext);
	return theme;
}

export default useTheme;
