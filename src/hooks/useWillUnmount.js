import { useEffect } from 'react';

export default onUnmount => useEffect(() => () => onUnmount && onUnmount(), []);
