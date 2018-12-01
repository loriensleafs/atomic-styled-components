import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import merge from './../utils/pureRecursiveMerge';
import cn from './../theme/className';
import { isFunc } from './../utils/helpers';
import { space } from 'styled-system';

const getStyles = props =>
	merge(space(props), isFunc(props.styles) ? props.styles(props) : props.styles || {});

const useStyles = props => useMemo(() => getStyles(props), [props]);

function CardContent(props) {
	const {
		className: classNameProp,
		component: Component,
		m,
		ml,
		mr,
		mt,
		mb,
		mx,
		my,
		p,
		pl,
		pr,
		pt,
		pb,
		px,
		py,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const className = useMemo(() => cn(classNameProp, useStyles({ ...props, theme })), [
		classNameProp,
		m,
		ml,
		mr,
		mt,
		mb,
		mx,
		my,
		p,
		pl,
		pr,
		pt,
		pb,
		px,
		py,
	]);

	return <Component className={className} {...passThru} />;
}

CardContent.propTypes = {
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	...space.propTypes,
};

CardContent.defaultProps = {
	component: 'div',
	py: 3,
	px: [2, 3],
};

export default CardContent;
