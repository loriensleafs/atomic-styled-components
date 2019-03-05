import { useMemo } from 'react';
import useTheme from './../theme/useTheme';
import cn from '../system/className';
import merge from '../utils/merge';
import { getKeys, isFn, isObj, toArr } from '../utils/helpers';

const DEFAULT_OPTIONS = {
	addClassNameTo: 'root',
	baseStyles: {},
	classes: true,
	nested: false,
	whitelist: [],
};

function useStyles(passedProps, passedReducers, passedOptions = {}) {
	const theme = useTheme();
	const props = useMemo(() => ({ ...passedProps, theme }), [
		passedProps,
		theme,
	]);
	const options = { ...DEFAULT_OPTIONS, ...passedOptions };
	const reducers = isFn(props.styles)
		? [...toArr(passedReducers), props.styles]
		: toArr(passedReducers);

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
		[props],
	);

	const next = useMemo(() => {
		const nextProps = getKeys(props)
			.filter(
				key =>
					!styleProps.includes(key) ||
					options.whitelist.includes(key),
			)
			.reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});
		const nextStyles = merge(
			reducers.length === 0
				? options.baseStyles
				: reducers.reduce(
						(acc, reducer) =>
							isFn(reducer) ? merge(acc, reducer(props)) : acc,
						options.baseStyles,
				  ),
			isObj(props.styles) ? props.styles : {},
		);
		const styleKeys = getKeys(nextStyles);
		let nextClasses;

		if (options.classes) {
			if (options.nested) {
				nextClasses = styleKeys.reduce((acc, style) => {
					let prefix = '';

					/**
					 * If props has a key classes, and props.classes has styles as
					 * one of it's keys, add that key's value to the prefix.
					 */
					if (
						props.classes &&
						isObj(props.classes) &&
						getKeys(props.classes).includes(style)
					) {
						prefix.concat(props.classes[style]);
					}

					/**
					 * If props has a key className, and options.addClassNameTo
					 * matches style, add the className to the prefix.
					 */
					if (props.className && options.addClassNameTo === style) {
						prefix.concat(props.className);
					}

					return { ...acc, [style]: cn(prefix, nextStyles[style]) };
				}, {});
			} else {
				nextClasses = cn(props.className, nextStyles);
			}
		}

		return { classes: nextClasses, props: nextProps, styles: nextStyles };
	}, [dependancies]);

	return next;
}

export default useStyles;
