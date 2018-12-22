import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import useStyles from './../hooks/useStyles';
import {
	alignContent as alignContentParser,
	alignItems as alignItemsParser,
	alignSelf as alignSelfParser,
	flex as flexParser,
	justifyContent as justifyContentParser,
	justifyItems as justifyItemsParser,
	justifySelf as justifySelfParser,
	order as orderParser,
	style,
} from 'styled-system';

export const flexBasis = style({
	prop: 'basis',
	cssProperty: 'flexBasis',
});

export const flexDirection = style({
	prop: 'dir',
	cssProperty: 'flexDirection',
	transformValue: n => (n === 'col' || n === 'column' ? 'column' : 'row'),
});

export const flexDisplay = props =>
	props.child ? null : props.inline ? { display: 'inline-flex' } : { display: 'flex' };

export const flexGrow = style({
	prop: 'grow',
	cssProperty: 'flexDirection',
});

export const flexShrink = style({
	prop: 'shrink',
	cssProperty: 'flexShrink',
});

export const flexWrap = style({
	prop: 'wrap',
	cssProperty: 'flexWrap',
	transformValue: n => n && 'wrap',
});

const Flex = forwardRef((props, ref) => {
	const {
		alignContent,
		alignItems,
		alignSelf,
		basis,
		child,
		children,
		dir,
		flex,
		grow,
		justifyContent,
		justifyItems,
		justifySelf,
		order,
		shrink,
		styles: stylesProp,
		wrap,
		...passThru
	} = props;
	const styles = useStyles(
		[
			alignContentParser,
			alignItemsParser,
			alignSelfParser,
			flexParser,
			flexBasis,
			flexDisplay,
			flexDirection,
			flexGrow,
			flexShrink,
			flexWrap,
			justifyContentParser,
			justifyItemsParser,
			justifySelfParser,
			orderParser,
		],
		{
			alignContent,
			alignItems,
			alignSelf,
			basis,
			child,
			dir,
			flex,
			grow,
			justifyContent,
			justifyItems,
			justifySelf,
			order,
			shrink,
			styles: stylesProp,
			wrap,
		},
	);

	return (
		<Box ref={ref} styles={styles} {...passThru}>
			{children}
		</Box>
	);
});

Flex.displayName = 'Flex';

Flex.propTypes = {
	...alignContentParser.propTypes,
	...alignItemsParser.propTypes,
	...alignSelfParser.propTypes,
	...flexParser.propTypes,
	...flexBasis.propTypes,
	...flexDirection.propTypes,
	...flexGrow.propTyeps,
	...flexShrink.propTypes,
	...flexWrap.propTypes,
	...justifyContentParser.propTypes,
	...justifyItemsParser.propTypes,
	...justifySelfParser.propTypes,
	...orderParser.propTypes,
	child: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
	inline: PropTypes.bool,
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Flex.defaultProps = {
	inline: false,
};

export default Flex;
