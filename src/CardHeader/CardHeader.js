import PropTypes from 'prop-types';
import React from 'react';
import { getSpacing, useStyles } from '../system';
import Typography from '../Typography';
import { componentPropType, stylesPropType } from '../utils/propTypes';

const getStyles = () => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		...getSpacing({ py: 3, px: [3, 4] }),
	},
	avatar: {
		flex: '0 0 auto',
		...getSpacing({ mr: 3 }),
	},
	action: {
		flex: '0 0 auto',
		alignSelf: 'flex-start',
		...getSpacing({ mt: -2, mr: [-3, -4] }),
	},
	content: {
		flex: '1 1 auto',
	},
	title: {},
	subheader: {},
});
getStyles.propTypes = getSpacing.propTypes;

const CardTitle = ({
	avatar,
	className,
	disableTypography,
	title,
	titleProps,
	...passThru
}) =>
	title &&
	!disableTypography &&
	(!title.type || (title.type && title.type !== Typography)) ? (
		<Typography
			as="span"
			className={className}
			variant={avatar ? 'body2' : 'headline'}
			{...titleProps}
			{...passThru}
		>
			{title}
		</Typography>
	) : (
		title || null
	);

const CardSubHeader = ({
	avatar,
	className,
	disableTypography,
	subheader,
	subheaderProps,
	...passThru
}) =>
	subheader &&
	!disableTypography &&
	(subheader.type && subheader.type !== Typography) ? (
		<Typography
			as="span"
			className={className}
			color="text.secondary"
			variant={avatar ? 'body2' : 'body1'}
			{...subheaderProps}
			{...passThru}
		>
			{subheader}
		</Typography>
	) : (
		subheader || null
	);

function CardHeader(props) {
	const {
		classes,
		props: {
			action,
			as: Component,
			avatar,
			className,
			disableTypography,
			subheader,
			subheaderProps,
			title,
			titleProps,
			...passThru
		},
	} = useStyles(props, getStyles, { nested: true });

	return (
		<Component className={classes.root} {...passThru}>
			{avatar && <div className={classes.avatar}>{avatar}</div>}
			<div className={classes.content}>
				<CardTitle
					avatar={avatar}
					className={classes.title}
					disableTypography={disableTypography}
					title={title}
					titleProps={titleProps}
				/>
				<CardSubHeader
					avatar={avatar}
					className={classes.subheader}
					disableTypography={disableTypography}
					subheader={subheader}
					subheaderProps={subheaderProps}
				/>
			</div>
			{action && <div className={classes.action}>{action}</div>}
		</Component>
	);
}

CardHeader.displayName = 'CardHeader';

CardHeader.propTypes = {
	// The action to display in the card header.
	action: PropTypes.node,
	// The Avatar for the Card Header.
	avatar: PropTypes.node,
	className: PropTypes.string,
	/**
	 * If `true`, the children won't be wrapped by a Typography component.
	 * This can be useful to render an alternative Typography variant by
	 * wrapping
	 * the `title` text, and optional `subheader` text
	 * with the Typography component.
	 */
	disableTypography: PropTypes.bool,
	// The content of the component.
	subheader: PropTypes.node,
	/**
	 * These props will be forwarded to the subheader
	 * (as long as disableTypography is not `true`).
	 */
	subheaderProps: PropTypes.object,
	// The content of the Card Title.
	title: PropTypes.node,
	/**
	 * These props will be forwarded to the title
	 * (as long as disableTypography is not `true`).
	 */
	titleProps: PropTypes.object,
	...componentPropType,
	...stylesPropType,
	...getStyles.propTypes,
};

CardHeader.defaultProps = {
	as: 'div',
	disableTypography: false,
};

export default CardHeader;
