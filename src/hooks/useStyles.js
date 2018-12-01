import { useMemo } from 'react';
import merge from './../utils/pureRecursiveMerge';
import { isFunc } from './../utils/helpers';

export default (
	{ styles: _styles, stylesProp: _stylesProp, ...props },
	conditions = [],
	styles = [],
) =>
	useMemo(
		() =>
			merge(
				styles.map(style => (isFunc(style) ? style(props) : style || {})).reduce(merge, {}),
				isFunc(_stylesProp) ? _stylesProp(props) : _stylesProp || {},
				isFunc(_styles) ? _styles(props) : _styles || {},
			),
		conditions,
	);
