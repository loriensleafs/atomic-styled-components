import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import ButtonBase from './../ButtonBase';
import merge from './../utils/pureRecursiveMerge';
import cn from './../theme/className';
import { isFunc } from './../utils/helpers';

const getStyles = props =>
	merge(
		{
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
		},
		isFunc(props.styles) ? props.styles(props) : props.styles || {},
	);

const useStyles = props => useMemo(() => getStyles(props), [props]);

function CardActionArea(props) {
	const { children, className: classNameProp, styles, ...passThru } = props;
	const { theme } = useContext(ThemeContext);
	const { rootStyles, focusHighlightStyles } = useStyles({ ...props, theme });
	const focusHilightClassName = useMemo(() => cn(focusHighlightStyles), [focusHighlightStyles]);

	return (
		<ButtonBase className={classNameProp} styles={{ rootStyles }} {...passThru}>
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
