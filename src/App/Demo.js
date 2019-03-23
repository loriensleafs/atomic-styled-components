import React from 'react';
import Flex from './../Flex';

const Demo = ({ children, ...props }) => <Flex {...props}>{children}</Flex>;

Demo.displayName = 'Demo';

Demo.defaultProps = {
	position: 'relative',
	mb: 4,
	mx: 32,
	p: [3, 4],
	justifyContent: ['flex-start', null, 'center'],
	alignItems: 'center',
	wrap: 'wrap',
	bg: 'grey.light',
	radius: 'round',
};

export default Demo;
