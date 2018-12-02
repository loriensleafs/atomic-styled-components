import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { space } from './../styles';

const getBaseStyles = props => ({
	...space({
		py: 3,
		px: [3, 3.5],
	}),
	':last-child': space({
		pb: 3.5,
	}),
});

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
		styles: stylesProp,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const styles = useStyles(
		{ m, ml, mr, mt, mb, mx, my, p, pl, pr, pt, pb, px, py, stylesProp, theme },
		[m, ml, mr, mt, mb, mx, my, p, pl, pr, pt, pb, px, py, stylesProp, theme],
		[getBaseStyles, space],
	);
	const className = useMemo(() => cn(classNameProp, styles), [classNameProp, styles]);

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
};

export default CardContent;
