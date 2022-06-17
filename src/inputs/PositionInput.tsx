import { InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import _ from 'lodash';

export interface PositionInputProps {
	value?: number;
	onChange?: (value: number) => void;
	label?: string;
	size?: 'small' | 'medium';
	disabled?: boolean;
}

export default function (props: PositionInputProps) {
	const [textValue, setTextValue] = useState<string>('');

	useEffect(() => {
		if (_.isNumber(props.value) && !_.isNaN(props.value)) {
			setTextValue(String(props.value));
		} else {
			setTextValue('');
		}
	}, [props.value]);

	const handleBlur = () => {
		const value = parseInt(textValue);
		if (_.isNumber(value) && !_.isNaN(value)) {
			props.onChange?.(value);
		} else {
			setTextValue(String(props.value));
		}
	};

	return (
		<TextField
			value={textValue}
			onChange={(e) => setTextValue(e.target.value)}
			onBlur={handleBlur}
			label={props.label}
			size={props.size || 'small'}
			InputProps={{
				inputMode: 'numeric',
				endAdornment: <InputAdornment position="end">m</InputAdornment>,
			}}
			type="number"
			disabled={props.disabled}
		/>
	);
}
