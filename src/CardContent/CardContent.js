import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { space } from './../styles';

const getBaseStyles = props => ({
	rootStyles: {
		...space({
			py: 3,
			px: [3, 3.5],
			theme: props.theme,
		}),
		':last-child': space({
			pb: 3.5,
			theme: props.theme,
		}),
	},
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
		styles,
		...passThru
	} = props;
	const { rootStyles } = useStyles([getBaseStyles, space], {
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
		styles,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [
		classNameProp,
		rootStyles,
	]);

	return <Component className={className} {...passThru} />;
}

CardContent.displayName = 'CardContent';

CardContent.propTypes = {
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The component used for the root node.
	 * Either a string to use a DOM element or a component.
	 */
	component: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.object,
	]),
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	...space.propTypes,
};

CardContent.defaultProps = {
	component: 'div',
};

export default CardContent;
