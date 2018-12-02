import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import Typography from './../Typography';
import useStyles from './../hooks/useStyles';
import cn from './../theme/className';
import { space } from 'styled-system';

const getBaseStyles = props => ({
	rootStyles: {
		display: 'flex',
		alignItems: 'center',
		...space({
			py: 3,
			px: [3, 4],
		}),
	},
	avatarStyles: {
		flex: '0 0 auto',
		...space({
			mr: 3,
		}),
	},
	actionStyles: {
		flex: '0 0 auto',
		alignSelf: 'flex-start',
		...space({
			mt: -2,
			mr: [-3, -4],
		}),
	},
	contentStyles: {
		flex: '1 1 auto',
	},
	titleStyles: {},
	subheaderStyles: {},
});

const CardTitle = (avatar, className, disableTypography, title, ...passThru) =>
	(title &&
		title.type !== Typography &&
		!disableTypography && (
			<Typography
				variant={avatar ? 'body2' : 'headline'}
				className={className}
				component="span"
				{...passThru}>
				{title}
			</Typography>
		)) ||
	title;

const CardSubHeader = (avatar, className, disableTypography, subheader, ...passThru) =>
	(subheader &&
		subheader.type !== Typography &&
		!disableTypography && (
			<Typography
				variant={avatar ? 'body2' : 'body1'}
				className={className}
				color="text.secondary"
				component="span"
				{...passThru}>
				{subheader}
			</Typography>
		)) ||
	subheader;

function CardHeader(props) {
	const {
		action,
		avatar,
		className: classNameProp,
		component: Component,
		disableTypography,
		subheader,
		subheaderTypographyProps,
		title,
		titleTypographyProps,
		styles,
		...passThru
	} = props;
	const { theme } = useContext(ThemeContext);
	const {
		rootStyles,
		avatarStyles,
		actionStyles,
		contentStyles,
		titleStyles,
		subheaderStyles,
	} = useStyles({ ...props, theme }, [props, theme], [getBaseStyles]);
	const className = useMemo(() => cn(classNameProp, rootStyles), [classNameProp, rootStyles]);
	const avatarClassName = useMemo(() => cn(avatarStyles), [avatarStyles]);
	const actionClassName = useMemo(() => cn(actionStyles), [actionStyles]);
	const contentClassName = useMemo(() => cn(contentStyles), [contentStyles]);
	const titleClassName = useMemo(() => cn(titleStyles), [titleStyles]);
	const subheaderClassName = useMemo(() => cn(subheaderStyles), [subheaderStyles]);

	return (
		<Component className={className} {...passThru}>
			{avatar && <div className={avatarClassName}>{avatar}</div>}
			<div className={contentClassName}>
				<CardTitle
					avatar={avatar}
					className={titleClassName}
					disableTypography={disableTypography}
					title={title}
					titleProps={titleTypographyProps}
				/>
				<CardSubHeader
					avatar={avatar}
					className={subheaderClassName}
					disableTypography={disableTypography}
					subheader={subheader}
					subheaderProps={subheaderTypographyProps}
				/>
			</div>
			{action && <div className={actionClassName}>{action}</div>}
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
	component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
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
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

CardHeader.defaultProps = {
	component: 'div',
	disableTypography: false,
};

export default CardHeader;
