import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import Paper from './../Paper';
import useStyles from './../hooks/useStyles';
import merge from './../utils/pureRecursiveMerge';

const getColorStyles = props =>
	props.color === 'primary' || props.color === 'secondary'
		? {
				paperStyles: {
					rootStyles: {
						backgroundColor: props.theme.palette[props.color].main,
						color: props.theme.palette[props.color].contrastText,
					},
				},
		  }
		: {
				paperStyles: {
					rootStyles: {
						backgroundColor:
							props.theme.palette.type === 'light'
								? props.theme.palette.grey.light
								: props.theme.palette.grey.dark,
					},
				},
		  };

const getPositionStyles = props => {
	switch (props.position) {
		case 'absolute':
			return {
				paperStyles: {
					rootStyles: {
						position: 'absolute',
						top: '0px',
						left: 'auto',
						right: '0px',
					},
				},
			};

		case 'fixed':
			return {
				paperStyles: {
					rootStyles: {
						position: 'fixed',
						top: '0px',
						left: 'auto',
						right: '0px',
					},
				},
			};

		case 'relative':
			return {
				paperStyles: {
					rootStyles: {
						position: 'relative',
					},
				},
			};

		case 'static':
			return {
				paperStyles: {
					rootStyles: {
						position: 'static',
					},
				},
			};

		case 'sticky':
			return {
				paperStyles: {
					rootStyles: {
						position: 'sticky',
						top: '0px',
						left: 'auto',
						right: '0px',
					},
				},
			};

		default:
			return null;
	}
};

const getBaseStyles = props => ({
	paperStyles: {
		rootStyles: {
			boxSizing: 'border-box',
			zIndex: 1100,
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			flexShrink: 0,
		},
	},
});

function AppBar(props) {
	const { children, className, color, position, styles, ...passThru } = props;
	const { paperStyles } = useStyles(
		[getBaseStyles, getPositionStyles, getColorStyles],
		{
			color,
			position,
			styles,
		},
		[color, position, styles.paperStyles.rootStyles],
	);

	return (
		<Paper
			square
			component="header"
			elevation={4}
			className={className}
			styles={paperStyles}
			{...passThru}>
			{children}
		</Paper>
	);
}

AppBar.displayName = 'AppBar';

AppBar.propTypes = {
	/**
	 * The content of the component.
	 */
	children: PropTypes.node.isRequired,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * The color of the component. It supports those theme colors that make sense for this component.
	 */
	color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'default']),
	/**
	 * The positioning type. The behavior of the different options is described
	 * [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
	 * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
	 */
	position: PropTypes.oneOf(['fixed', 'absolute', 'sticky', 'static', 'relative']),
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

AppBar.defaultProps = {
	color: 'primary',
	position: 'fixed',
};

export default AppBar;
