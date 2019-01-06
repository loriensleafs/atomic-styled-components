import { isNum, toPx } from './../utils/helpers';

export const getDimension = n => (!isNum(n) || n > 1 ? toPx(n) : n * 100 + '%');
