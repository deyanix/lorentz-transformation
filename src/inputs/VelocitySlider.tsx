import { Slider } from '@mui/material';
import { useCallback } from 'react';
import _ from 'lodash';

export interface VelocitySliderProps {
	variant?: 'linear' | 'logarithm';
	base?: number;
	min?: number;
	max?: number;
	step?: number;
	value?: number;
	onChange?: (value: number) => void;
}

export default function (props: VelocitySliderProps) {
	const formatValue = useCallback((value: number) => {
		const units = ['m/s', 'km/s', 'km/ms', 'km/μs', 'km/ns'];
		let unitIndex = 0;
		let scaledValue = value;

		while (scaledValue >= 1000 && unitIndex < units.length - 1) {
			unitIndex += 1;
			scaledValue /= 1000;
		}
		return `${Math.floor(scaledValue)} ${units[unitIndex]}`;
	}, []);

	const scaleValue = useCallback(
		(value: number) => {
			switch (props.variant) {
				default:
				case 'linear':
					return value;
				case 'logarithm':
					return (props.base || 1) ** value;
			}
		},
		[props.variant]
	);

	return (
		<Slider
			value={props.value}
			min={props.min}
			max={props.max}
			step={props.step}
			scale={scaleValue}
			getAriaLabel={formatValue}
			valueLabelFormat={formatValue}
			valueLabelDisplay="auto"
			onChange={(e, value) => {
				if (_.isArray(value)) {
					props.onChange?.(value[0]);
				} else {
					props.onChange?.(value);
				}
			}}
		/>
	);
}
