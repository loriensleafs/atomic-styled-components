import style from './../style';
import combine from './../../utils/combine';

const getGridGap = style({
	prop: 'gridGap',
});

const getGridColumnGap = style({
	prop: 'gridColumnGap',
});

const getGridRowGap = style({
	prop: 'gridRowGap',
});

const getGridColumn = style({
	prop: 'gridColumn',
});

const getGridRow = style({
	prop: 'gridRow',
});

const getGridAutoFlow = style({
	prop: 'gridAutoFlow',
});

const getGridAutoColumns = style({
	prop: 'gridAutoColumns',
});

const getGridAutoRows = style({
	prop: 'gridAutoRows',
});

const getGridTemplateColumns = style({
	prop: 'gridTemplateColumns',
});

const getGridTemplateRows = style({
	prop: 'gridTemplateRows',
});

const getGridTemplateAreas = style({
	prop: 'gridTemplateAreas',
});

const getGridArea = style({
	prop: 'gridArea',
});

const getGrid = combine(
	getGridGap,
	getGridColumnGap,
	getGridRowGap,
	getGridColumn,
	getGridRow,
	getGridAutoFlow,
	getGridAutoColumns,
	getGridAutoRows,
	getGridTemplateColumns,
	getGridTemplateRows,
	getGridTemplateAreas,
	getGridArea,
);
getGrid.propTypes = {
	...getGridGap.propTypes,
	...getGridColumnGap.propTypes,
	...getGridRowGap.propTypes,
	...getGridColumn.propTypes,
	...getGridRow.propTypes,
	...getGridAutoFlow.propTypes,
	...getGridAutoColumns.propTypes,
	...getGridAutoRows.propTypes,
	...getGridTemplateColumns.propTypes,
	...getGridTemplateRows.propTypes,
	...getGridTemplateAreas.propTypes,
	...getGridArea.propTypes,
};

export {
	getGridGap,
	getGridColumnGap,
	getGridRowGap,
	getGridColumn,
	getGridRow,
	getGridAutoFlow,
	getGridAutoColumns,
	getGridAutoRows,
	getGridTemplateColumns,
	getGridTemplateRows,
	getGridTemplateAreas,
	getGridArea,
};

export default getGrid;
