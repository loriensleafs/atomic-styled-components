import { useContext, useMemo } from 'react';
import ThemeContext from './../theme/ThemeContext';
import cn from './../system/className';
import merge from './../utils/merge';
import cssProps from './../utils/cssProperties';
import { getKeys, isEq, isFn, isObj, isStr, toArr } from './../utils/helpers';

function hasChildStyles(styles) {
	return styles.every(
		style =>
			isStr(style) &&
			(cssProps.includes(style) || style.startsWith('@media')),
	);
}

function useStyles(allProps, reducers, options = {}) {
	const { theme } = useContext(ThemeContext);
	const { classes = [], className = '', styles, ...props } = useMemo(
		() => ({ ...allProps, theme }),
		[allProps, theme],
	);
	const {
		baseStyles = {},
		cnPrefix = 'root',
		getClasses = true,
		whitelist = [],
	} = options;
	reducers = isFn(styles) ? [...toArr(reducers), styles] : toArr(reducers);

	if (!reducers || reducers.length === 0) {
		return isObj(styles) ? merge(baseStyles, styles) : baseStyles;
	}

	const styleProps = useMemo(
		() =>
			reducers.reduce(
				(acc, { propTypes }) =>
					propTypes
						? [
								...acc,
								...getKeys(propTypes).filter(
									key => !acc.includes(key),
								),
						  ]
						: acc,
				['classes', 'className', 'styles', 'theme'],
			),
		[],
	);

	const dependancies = useMemo(
		() => styleProps.map(key => key && props[key]),
		[props],
	);

	const nextProps = useMemo(
		() =>
			getKeys(props)
				.filter(
					key => !styleProps.includes(key) || whitelist.includes(key),
				)
				.reduce((acc, key) => ({ ...acc, [key]: props[key] }), {}),
		[props],
	);

	const nextStyles = useMemo(
		() =>
			merge(
				reducers.reduce(
					(acc, reducer) =>
						isFn(reducer) ? merge(acc, reducer(props)) : acc,
					baseStyles,
				),
				isObj(styles) ? styles : {},
			),
		[dependancies],
	);

	const nextClasses = useMemo(
		() => {
			const styleKeys = getKeys(nextStyles);

			if (getClasses && hasChildStyles(styleKeys)) {
				return cn(className, nextStyles);
			} else if (getClasses) {
				return styleKeys.reduce((acc, style) => {
					let prefix = '';

					if (classes[style]) prefix.concat(classes[style]);
					if (cnPrefix === style) prefix.concat(className);

					return { ...acc, [style]: cn(prefix, nextStyles[style]) };
				}, {});
			}
		},
		[className, nextStyles],
	);

	return [{ styles: nextStyles, classes: nextClasses }, nextProps];
}

export default useStyles;
