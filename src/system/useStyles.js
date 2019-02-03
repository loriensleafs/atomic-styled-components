import { useContext, useMemo } from 'react';
import ThemeContext from '../theme/ThemeContext';
import cn from '../system/className';
import merge from '../utils/merge';
import cssProps from '../utils/cssProperties';
import { getKeys, isFn, isObj, isStr, toArr } from '../utils/helpers';

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

	// We only want to do this one time.
	const styleProps = useMemo(
		() =>
			reducers.length === 0
				? ['classes', 'className', 'styles', 'theme']
				: reducers.reduce(
						(acc, reducer) =>
							reducer && reducer.hasOwnProperty('propTypes')
								? [
										...acc,
										...getKeys(reducer.propTypes).filter(
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
		[allProps],
	);

	const next = useMemo(() => {
		let nextProps = getKeys(props)
			.filter(key => !styleProps.includes(key) || whitelist.includes(key))
			.reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});

		let nextStyles = merge(
			reducers.length === 0
				? baseStyles
				: reducers.reduce(
						(acc, reducer) =>
							isFn(reducer) ? merge(acc, reducer(props)) : acc,
						baseStyles,
				  ),
			isObj(styles) ? styles : {},
		);

		let styleKeys = getKeys(nextStyles);
		let nextClasses;
		if (getClasses && hasChildStyles(styleKeys)) {
			nextClasses = cn(className, nextStyles);
		} else if (getClasses) {
			nextClasses = styleKeys.reduce((acc, style) => {
				let prefix = '';

				if (classes[style]) prefix.concat(classes[style]);
				if (cnPrefix === style) prefix.concat(className);

				return { ...acc, [style]: cn(prefix, nextStyles[style]) };
			}, {});
		}

		return [{ classes: nextClasses, styles: nextStyles }, nextProps];
	}, [dependancies]);

	return next;
}

export default useStyles;
