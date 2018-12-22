import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { minHeight } from 'styled-system';
import { space } from './../styles/space';

const getGutterStyles = ({theme, ...props}) =>
	!props.disableGutters && {
		rootStyles: space({
			px: [3, 3.5],
			theme
		}),
	};

const getVariantStyles = ({theme, ...props}) => {
	switch (props.variant) {
		case 'dense':
			return {
				rootStyles: {
					minHeight: '48px',
				},
			};

		case 'regular':
			return {
				rootStyles: minHeight({
					minHeight: ['48px', '56px', '64px'],
					theme
				}),
			};

		default:
			return null;
	}
};

const getBaseStyles = {
	rootStyles: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
	},
};

function Toolbar(props) {
	const {
		children,
		className: classNameProp,
		disableGutters,
		styles,
		variant,
		...passThru
	} = props;
	const { rootStyles } = useStyles([getBaseStyles, getVariantStyles, getGutterStyles], {
		disableGutters,
		styles,
		variant,
	});
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);

	return (
		<div className={className} {...passThru}>{children}</div>
	);
}

Toolbar.displayName = 'Toolbar';

Toolbar.propTypes = {
	/**
	 * Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
	 */
	children: PropTypes.node,
	/**
	 * @ignore
	 */
	className: PropTypes.string,
	/**
	 * If `true`, disables gutter padding.
	 */
	disableGutters: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	/**
	 * The variant to use.
	 */
	variant: PropTypes.oneOf(['regular', 'dense']),
};

Toolbar.defaultProps = {
	disableGutters: false,
	variant: 'regular',
};

export default Toolbar;
