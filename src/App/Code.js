import React from 'react';
import useStyles from './../system/useStyles';

const baseStyles = {
	root: {
		fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
		textAlign: 'left',
		whiteSpace: 'pre-line',
		wordSpacing: 'normal',
		wordBreak: 'normal',
		wordWrap: 'normal',
		tabSize: 4,
		hyphens: 'none',
	},
};

function Code(props) {
	const { classes } = useStyles(props, null, { baseStyles });

	return <code className={classes.root} {...props} />;
}

Code.displayName = 'Code';

export default Code;
