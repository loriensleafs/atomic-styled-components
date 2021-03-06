import React from 'react';
import SvgIcon from './../SvgIcon';

const KeyboardArrowLeft = props => (
	<SvgIcon {...props}>
		<path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
		<path fill="none" d="M0 0h24v24H0V0z" />
	</SvgIcon>
);

KeyboardArrowLeft.displayName = 'KeyboardArrowLeftIcon';

export default KeyboardArrowLeft;
