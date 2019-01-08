import React from 'react';
import PropTypes from 'prop-types';
import Typography from './../Typography';
import { getSpacing, useStyles } from './../system';
import { stylesPropType } from './../utils/propTypes';

function getStyles(props) {
	return {
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
	};
}
getStyles.propTypes = getSpacing.propTypes;

const CardTitle = (avatar, className, disableTypography, title, ...passThru) =>
	(title &&
		(!title.type || (title.type && title.type !== Typography)) &&
		!disableTypography && (
			<Typography
				variant={avatar ? 'body2' : 'headline'}
				className={className}
				component="span"
				{...passThru}
			>
				{title}
			</Typography>
		)) ||
	title ||
	null;

const CardSubHeader = (
	avatar,
	className,
	disableTypography,
	subheader,
	...passThru
) =>
	(subheader &&
		(!subheader.type ||
			(subheader.type && subheader.type !== Typography)) &&
		!disableTypography && (
			<Typography
				variant={avatar ? 'body2' : 'body1'}
				className={className}
				color="text.secondary"
				component="span"
				{...passThru}
			>
				{subheader}
			</Typography>
		)) ||
	subheader ||
	null;

function CardHeader(props) {
	const [
		{ classes },
		{
			action,
			avatar,
			className,
			component: Component,
			disableTypography,
			subheader,
			subheaderTypographyProps,
			title,
			titleTypographyProps,
			...passThru
		},
	] = useStyles(props, getStyles);

	return (
		<Component className={classes.root} {...passThru}>
			{avatar && <div className={classes.avatar}>{avatar}</div>}
			<div className={classes.content}>
				<CardTitle
					avatar={avatar}
					className={classes.title}
					disableTypography={disableTypography}
					title={title}
					titleProps={titleTypographyProps}
				/>
				<CardSubHeader
					avatar={avatar}
					className={classes.subheader}
					disableTypography={disableTypography}
					subheader={subheader}
					subheaderProps={subheaderTypographyProps}
				/>
			</div>
			{action && <div className={classes.action}>{action}</div>}
		</Component>
	);
}

CardHeader.displayName = 'CardHeader';

CardHeader.propTypes = {
	/**
	 * The action to display in the card header.
	 */
	action: PropTypes.node,
	/**
	 * The Avatar for the Card Header.
	 */
	avatar: PropTypes.node,
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
	/**
	 * If `true`, the children won't be wrapped by a Typography component.
	 * This can be useful to render an alternative Typography variant by wrapping
	 * the `title` text, and optional `subheader` text
	 * with the Typography component.
	 */
	disableTypography: PropTypes.bool,
	/**
	 * The content of the component.
	 */
	subheader: PropTypes.node,
	/**
	 * These props will be forwarded to the subheader
	 * (as long as disableTypography is not `true`).
	 */
	subheaderTypographyProps: PropTypes.object,
	/**
	 * The content of the Card Title.
	 */
	title: PropTypes.node,
	/**
	 * These props will be forwarded to the title
	 * (as long as disableTypography is not `true`).
	 */
	titleTypographyProps: PropTypes.object,
	...stylesPropType,
};

CardHeader.defaultProps = {
	component: 'div',
	disableTypography: false,
};

export default CardHeader;
