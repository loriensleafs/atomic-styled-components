import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../system/useStyles';
import { stylesPropType } from '../utils/propTypes';

const getStyles = ({ theme: { getTransition, shape } }) => ({
	root: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		top: -5,
		left: 0,
		margin: 0,
		padding: 0,
		pointerEvents: 'none',
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

function NotchedOutline(props) {
	const [
		{ classes },
		{
			children,
			className,
			labelWidth: labelWidthProp,
			notched,
			style,
			...passThru
		},
	] = useStyles(props, getStyles);

	const labelWidth = labelWidthProp > 0 ? labelWidthProp * 0.75 + 8 : 0;

	return (
		<fieldset
			aria-hidden
			style={{
				paddingRight: 8 + (notched ? 0 : labelWidth / 2),
				...style,
			}}
			className={classes.root}
			{...passThru}
		>
			<legend
				className={classes.legend}
				style={{
					// IE 11: fieldset with legend does not render
					// a border radius. This maintains consistency
					// by always having a legend rendered
					width: notched ? labelWidth : 0.01,
				}}
			>
				{/* Use the nominal use case of the legend, avoid rendering artefacts. */}
				{/* eslint-disable-next-line react/no-danger */}
				<span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
			</legend>
		</fieldset>
	);
}

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
	...stylesPropType,
};

export default NotchedOutline;
