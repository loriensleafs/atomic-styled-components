import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import ButtonBase from './../ButtonBase';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';

const getBaseStyles = props => ({
	rootStyles: {
		display: 'block',
		width: '100%',
		textAlign: 'inherit',
	},
	focusHighlightStyles: {
		position: 'absolute',
		top: '0px',
		right: '0px',
		bottom: '0px',
		left: '0px',
		opacity: 0,
		backgroundColor: 'currentcolor',
		transition: `opacity ${
			props.theme.duration.shortest
		}ms cubic-bezier(${props.theme.easing.in.join()})`,
		':hover': {
			opacity: props.theme.palette.action.hoverOpacity,
		},
		':focus': {
			opacity: props.theme.palette.action.hoverOpacity,
		},
	},
});

function CardActionArea(props) {
	const { children, className, styles: stylesProp, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles, focusHighlightStyles } = useStyles(
		{ ...props, theme },
		[props, theme],
		[getBaseStyles],
	);
	const focusHilightClassName = useMemo(() => cn(focusHighlightStyles), [focusHighlightStyles]);

	return (
		<ButtonBase className={className} styles={{ rootStyles }} {...passThru}>
			{children}
			<span className={focusHilightClassName} />
		</ButtonBase>
	);
}

CardActionArea.propTypes = {
	/**
	 * The content of the component.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default CardActionArea;
