import React, { forwardRef, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './../theme/ThemeContext';
import Box from '../Box';
import useStyles from './../hooks/useStyles';
import {
	gridGap as gridGapParser,
	gridColumnGap as gridColumnParser,
	gridRowGap as gridRowGapParser,
	gridColumn as gridColumnParser,
	gridRow as gridRowParser,
	gridAutoFlow as gridAutoFlowParser,
	gridAutoColumns as gridAutoColumnsParser,
	gridAutoRows as gridAutoRowsParser,
	gridTemplateColumns as gridTemplateColumnsParser,
	gridTemplateRows as gridTemplateRowsParser,
	gridTemplateAreas as gridTemplateAreasParser,
	gridArea as gridAreaParser,
} from 'styled-system';

const Grid = forwardRef((props, ref) => {
	const {
		children,
		gridGap,
		gridColumnGap,
		gridRowGap,
		gridColumn,
		gridRow,
		gridAutoFlow,
		gridAutoColumns,
		gridAutoRows,
		gridTemplateColumns,
		gridTemplateRows,
		gridTemplateAreas,
		gridArea,
		styles: stylesProp,
		...passThru
	} = props;
	const styles = useStyles([
		gridGapParser,
		gridColumnParser,
		gridRowGapParser,
		gridColumnParser,
		gridRowParser,
		gridAutoFlowParser,
		gridAutoColumnsParser,
		gridAutoRowsParser,
		gridTemplateColumnsParser,
		gridTemplateRowsParser,
		gridTemplateAreasParser,
		gridAreaParser,
	], {
		gridGap,
		gridColumnGap,
		gridRowGap,
		gridColumn,
		gridRow,
		gridAutoFlow,
		gridAutoColumns,
		gridAutoRows,
		gridTemplateColumns,
		gridTemplateRows,
		gridTemplateAreas,
		gridArea,
		styles: stylesProp
	})

	return (
		<Box ref={ref} styles={styles} {...passThru}>{children}</Box>
	)
})

Grid.displayName = 'Grid'

Grid.propTypes = {
	...gridGapParser.propTypes,
	...gridColumnGapParser.propTypes,
	...gridRowGapParser.propTypes,
	...gridColumnParser.propTypes,
	...gridRowParser.propTypes,
	...gridAutoFlowParser.propTypes,
	...gridAutoColumnsParser.propTypes,
	...gridAutoRowsParser.propTypes,
	...gridTemplateColumnsParser.propTypes,
	...gridTemplateRowsParser.propTypes,
	...gridTemplateAreasParser.propTypes,
	...gridAreaParser.propTypes,
	children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
	styles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
}

export default Grid;
