import { useCallback, useEffect, useMemo, useState } from 'react';

const getConfig = ({ type, ...props }) => {
	const prop = type === 'radio' || type === 'checkbox' ? 'checked' : 'value';
	const controlled = props[prop] !== null;
	const initial = controlled ? props[prop] : false;
	return { controlled, initial, prop };
};

function useInput({ onChange, ...props }) {
	const config = useMemo(() => getConfig(props), []);
	const [value, setValue] = useState(config.initial);

	const handleChange = useCallback(
		event => {
			const nextValue = event.currentTarget[config.prop];
			if (nextValue !== value) {
				setValue(nextValue);
			}
			if (onChange) {
				onChange(event, nextValue);
			}
		},
		[value],
	);

	useEffect(() => {
		let nextValue = props[config.prop];
		if (config.controlled && nextValue !== value) {
			setValue(nextValue);
		}
	}, [props[config.prop]]);

	return [value, handleChange];
}

export default useInput;
