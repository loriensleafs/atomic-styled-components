export const num = (n) => typeof n === 'number' && !isNaN(n);

export const px = (n) => (num(n) ? n + 'px' : n);

export const getDimension = (n) => (!num(n) || n > 1 ? px(n) : n * 100 + '%');
