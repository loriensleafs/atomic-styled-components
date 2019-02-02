import PropTypes from 'prop-types';
import { theme } from './../theme';
import { getPath, isNil, isArr, noop } from './../utils/helpers';

const propTypes = {
	numberOrString: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	responsive: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.array,
	]),
};

const cloneFunc = fn => (...args) => fn(...args);

function style(options) {
	const { prop, cssProp, themeKey, themeMap = {}, transform } = options;
	const cssProperty = cssProp || prop;
	const transformTheme = transform || noop;

	function fn(props) {
		const propValue = props[prop];
		if (isNil(propValue)) return null;

		const breakpoints = [null, ...theme.mediaQueries];
		const mapToTheme = getPath(theme, themeKey) || themeMap;
		function getStyle(propVal) {
			if (isNil(propVal)) return null;
			const val = getPath(mapToTheme, propVal) || propVal;

			return {
				[cssProperty]: transformTheme(val),
			};
		}

		if (!isArr(propValue)) {
			return getStyle(propValue);
		}

		let styles = {};

		for (let i = 0; i < propValue.length; i++) {
			const bp = breakpoints[i];
			if (!bp) {
				styles = getStyle(propValue[i]) || {};
				continue;
			}
			const styleRule = getStyle(propValue[i]);
			if (!styleRule) continue;
			styles[bp] = styleRule;
		}

		return styles;
	}
	fn.propTypes = {
		responsive: cloneFunc(propTypes.responsive),
	};
	fn.propTypes.meta = {
		prop,
		themeKey,
		styleType: 'responsive',
	};

	return fn;
}

export default style;
