import { useContext, useMemo } from 'react';
import ThemeContext from './../theme/ThemeContext';
import cn from './../system/className';
import merge from './../utils/merge';
import cssProperties from './../utils/cssProperties';
import { getKeys, isFn, isObj, isStr, toArr } from './../utils/helpers';

const DEFAULT_OPTIONS = {
	classes: true,
	baseStyles: {},
	whiltelist: [],
};

function useStyles(props, reducers, options = {}) {
	const { theme } = useContext(ThemeContext);
	const { baseStyles = {}, whitelist = [] } = {
		...DEFAULT_OPTIONS,
		...options,
	};
	const { classes = [], styles, ..._props } = useMemo(
		() => ({ ...props, theme }),
		[props, theme],
	);
	reducers = isFn(styles) ? [...toArr(reducers), styles] : toArr(reducers);

	if (!reducers || reducers.length === 0) {
		return isObj(styles) ? merge(baseStyles, styles) : baseStyles;
	}

	const styleProps = useMemo(
		() =>
			reducers.reduce(
				(acc, prop) =>
					prop.propTypes
						? [
								...acc,
								...getKeys(prop.propTypes).filter(
									key => !acc.includes(key),
								),
						  ]
						: acc,
				['classes', 'styles', 'theme'],
			),
		[],
	);

	const dependancies = useMemo(
		() => styleProps.map(key => key && _props[key]),
		[_props],
	);

	const nextProps = useMemo(
		() =>
			getKeys(_props)
				.filter(
					key => !styleProps.includes(key) || whitelist.includes(key),
				)
				.reduce((acc, key) => ({ ...acc, [key]: _props[key] }), {}),
		[_props],
	);

	const nextStyles = useMemo(
		() => {
			let style = reducers.reduce(
				(acc, reducer) =>
					isFn(reducer) ? merge(acc, reducer(_props)) : acc,
				baseStyles,
			);

			return isObj(styles) ? merge(style, styles) : style;
		},
		[dependancies],
	);

	const nextClasses = useMemo(
		() =>
			classes &&
			getKeys(nextStyles).every(
				style =>
					isStr(style) &&
					(cssProperties.includes(style) ||
						style.startsWith('@media')),
			)
				? _props.className
					? cn(_props.className, nextStyles)
					: cn(nextStyles)
				: getKeys(nextStyles).reduce(
						(acc, style) => ({
							...acc,
							[style]: classes[style]
								? cn(classes[style], nextStyles[style])
								: cn(nextStyles[style]),
						}),
						{},
				  ),
		[nextStyles],
	);

	return [nextProps, nextStyles, nextClasses];
}

export default useStyles;
