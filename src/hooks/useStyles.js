import { useContext, useMemo } from 'react';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import { isFunc, isObject } from './../utils/helpers';

/**
 * Passes props through a list of style parsers, converting any style
 * props to actual styles and merging them into a parsed styles
 * object.
 * Will run/merge the 'styles' parser/object last.
 * Will merge the 'theme' object into the passed props.
 * @param {Array} parsers - An array of style parsers that the passed
 * props will be run through.
 * @param {Object} props - The props to be evaluated by the passed array
 * of style parsers.
 * @param {Object|Function} props.styles - An object or function passed to a
 * Component that will be merged into the parsed styles last, allowing
 * the parsed styles to be overridden.
 * @param {Array} propDependancies - The props will only be parsed if one or
 * more value(s) in the propDependancies array changes.  If none is passed
 * the prop values will be used by default instead.
 * @return {Object} - The resulting parsed styles.
 */
function useStyles(parsers, { children, styles, ...props }, propDependancies) {
	const { theme } = useContext(ThemeContext);
	const dependancies = useMemo(
		() => {
			if (propDependancies) {
				return [...propDependancies, styles, theme];
			} else if (Object.keys(props).length > 0) {
				return [...Object.keys(props).map(p => props[p]), styles, theme];
			} else {
				return [styles, theme] || [];
			}
		},
		[propDependancies, props, styles, theme],
	);
	const styleProps = { ...props, theme };
	const parsedStyles = useMemo(
		() => {
			let next = parsers.reduce(
				(parsed, parser) => merge(parsed, isFunc(parser) ? parser(styleProps) : parser),
				{},
			);

			if (isFunc(styles) || isObject(styles)) {
				next = merge(next, isFunc(styles) ? styles(styleProps) : styles);
			}

			return next;
		},
		[dependancies],
	);

	return parsedStyles;
}

export default useStyles;
