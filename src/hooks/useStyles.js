import { useContext, useMemo } from 'react';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import { isFunc, isObject } from './../utils/helpers';

function useStyles(
	parsers,
	{children, styles, ...props},
	propDependancies
) {
	const { theme } = useContext(ThemeContext);
	const dependancies = useMemo(() => {
		if (propDependancies) {
			return [...propDependancies, styles, theme]
		} else if (Object.keys(props).length > 0) {
			return [...Object.keys(props).map(p => props[p]), styles, theme];
		} else {
			return [styles, theme] || [];
		}
	}, [propDependancies, props, styles, theme]);
	const styleProps = {...props, theme};
	const parsedStyles = useMemo(() => {
		let next = parsers.reduce((parsed,parser) => merge(parsed, isFunc(parser) ? parser(styleProps) : parser),{});

		if (isFunc(styles) || isObject(styles)) {
			next = merge(next, isFunc(styles) ? styles(styleProps) : styles);
		}

		return next;
	}, [dependancies])

	return parsedStyles
}

export default useStyles;
