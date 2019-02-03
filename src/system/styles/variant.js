import { theme } from '../../theme';
import { getPath } from '../../utils/helpers';
import { numOrStrPropType } from '../../utils/propTypes';

const variant = ({ themeKey, prop = 'variant' }) => {
	const fn = props => getPath(theme, themeKey)[props[prop]] || null;
	fn.propTypes = {
		[prop]: numOrStrPropType,
	};

	return fn;
};

export default variant;
