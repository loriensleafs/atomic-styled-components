import React from 'react';
import SvgIcon from './../SvgIcon';

const Menu = props => (
	<SvgIcon {...props}>
		<path fill="none" d="M0 0h24v24H0z" />
		<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
	</SvgIcon>
);

Menu.displayName = 'MenuIcon';

export default Menu;
