import { num, px } from './../utils/helpers';

export const getDimension = (n) => (!num(n) || n > 1 ? px(n) : n * 100 + '%');
