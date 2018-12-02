import React, { useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import ButtonBase from './../ButtonBase';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';

const getFocusVisibleStyles = props =>
	props.focusVisible && {
		focusHighlightStyles: {
			opacity: 0.12,
			':hover': {
				opacity: props.theme.palette.action.hoverOpacity,
			},
		},
	};

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
		pointerEvents: 'none',
		transition: `opacity ${
			props.theme.duration.shortest
		}ms cubic-bezier(${props.theme.easing.in.join()})`,
	},
});

function CardActionArea(props) {
	const { children, className, styles, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const [focusVisible, setFocusVisible] = useState(false);
	const { rootStyles, focusHighlightStyles } = useStyles(
		{ ...props, focusVisible, styles, theme },
		[props, focusVisible, styles, theme],
		[getBaseStyles, getFocusVisibleStyles],
	);
	const focusHilightClassName = useMemo(() => cn(focusHighlightStyles), [focusHighlightStyles]);

	const handleFocusVisible = useCallback(event => setFocusVisible(true), []);

	const handleBlur = useCallback(event => setFocusVisible(false), []);

	return (
		<ButtonBase
			className={className}
			styles={{ rootStyles }}
			onFocusVisible={handleFocusVisible}
			onBlur={handleBlur}
			{...passThru}>
			{children}
			<span className={focusHilightClassName} />
		</ButtonBase>
	);
}

CardActionArea.displayName = 'CardActionArea';

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
