import { num, px } from './../utils/helpers';

export const dimension = (n) => (!num(n) || n > 1 ? px(n) : n * 100 + '%');
