import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import useStyles from '../system/useStyles';
import combine from '../utils/combine';
import { stylesPropType } from '../utils/propTypes';

const getBaseStyles = ({ theme: { getTransition, palette, shape } }) => ({
	root: {
		position: 'absolute',
		bottom: '0px',
		right: '0px',
		top: '-5px',
		left: '0px',
		margin: '0px',
		padding: '0px',
		pointerEvents: 'none',
		borderColor:
			palette.type === 'light'
				? 'rgba(0, 0, 0, 0.23)'
				: 'rgba(255, 255, 255, 0.23)',
		borderRadius: shape.borderRadius.round,
		borderStyle: 'solid',
		borderWidth: '1px',
		transition: getTransition(
			['padding-right', 'border-color', 'border-width'],
			{
				duration: 'shorter',
				easing: 'out',
			},
		),
		':hover': {
			borderColor: palette.text.primary,
			'@media (hover: none)': {
				borderColor:
					palette.type === 'light'
						? 'rgba(0, 0, 0, 0.23)'
						: 'rgba(255, 255, 255, 0.23)',
			},
		},
	},
	legend: {
		padding: '0px',
		lineHeight: '11px',
		textAlign: 'left',
		transition: getTransition('width', {
			duration: 'shorter',
			easing: 'out',
		}),
	},
});

const getDisabledStyles = ({ disabled, theme: { palette } }) =>
	disabled && {
		root: {
			borderColor: palette.action.disabled,
		},
	};

const getErrorStyles = ({ disabled, error, theme: { palette } }) =>
	!disabled &&
	error && {
		root: {
			borderColor: palette.error.main,
		},
	};

const getFocusedStyles = ({ disabled, focused, theme: { palette } }) =>
	!disabled &&
	focused && {
		root: {
			borderColor: palette.primary.main,
			borderWidth: '2px',
		},
	};

const getStyles = combine(
	getBaseStyles,
	getDisabledStyles,
	getFocusedStyles,
	getErrorStyles,
);
getStyles.propTypes = {
	disabled: PropTypes.bool,
	error: PropTypes.bool,
	focused: PropTypes.bool,
};

const NotchedOutline = forwardRef((props, ref) => {
	const {
		classes,
		props: {
			children,
			labelWidth: labelWidthProp,
			notched,
			style,
			...passThru
		},
	} = useStyles(props, getStyles, { nested: true });
	const labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0;

	return (
		<fieldset
			aria-hidden
			style={{
				paddingLeft: `${8 + (notched ? 0 : labelWidth / 2)}px`,
				...style,
			}}
			className={classes.root}
			ref={ref}
			{...passThru}
		>
			<legend
				className={classes.legend}
				style={{ width: `${notched ? labelWidth : 0}px` }}
			>
				{/* Use the nominal use case of the legend, avoid rendering artefacts. */}
				{/* eslint-disable-next-line react/no-danger */}
				<span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
			</legend>
		</fieldset>
	);
});

NotchedOutline.displayName = 'NotchedOutline';

NotchedOutline.propTypes = {
	// The content of the component.
	children: PropTypes.node,
	/**
	 * Override or extend the styles applied to the component.
	 * See [CSS API](#css-api) below for more details.
	 */
	classes: PropTypes.object,
	className: PropTypes.string,
	// The width of the legend.
	labelWidth: PropTypes.number.isRequired,
	// If `true`, the outline is notched to accommodate the label.
	notched: PropTypes.bool.isRequired,
	style: PropTypes.object,
	...getStyles.propTypes,
	...stylesPropType,
};

export default NotchedOutline;
