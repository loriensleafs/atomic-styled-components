import React from 'react';
import SvgIcon from './../SvgIcon';

const KeyboardArrowRight = props => (
	<SvgIcon {...props}>
		<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
		<path fill="none" d="M0 0h24v24H0V0z" />
	</SvgIcon>
);

KeyboardArrowRight.displayName = 'KeyboardArrowRightIcon';

export default KeyboardArrowRight;
