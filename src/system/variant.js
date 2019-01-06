import { theme } from './../theme';
import { getPath } from './../utils/helpers';
import { numOrStrPropType } from './../utils/propTypes';

function variant(options) {
	const { themeKey, prop = 'variant' } = options;

	function fn(props) {
		return getPath(theme, themeKey)[props[prop]] || null;
	}
	fn.propTypes = {
		[prop]: numOrStrPropType,
	};

	return fn;
}

export default variant;
