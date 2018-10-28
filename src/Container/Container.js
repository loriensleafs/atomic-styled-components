import { withStyle } from 'styletron-react';
import { themify } from './../theme';
import Box from './../Box';

const Container = withStyle(Box, ({ theme }) => ({
	maxWidth: theme.maxWidth,
}));

Container.displayName = 'Container';

Container.defaultProps = {
	mx: 'auto',
	px: 3,
};

export default themify(Container);
