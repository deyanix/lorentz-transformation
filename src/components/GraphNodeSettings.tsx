import ColorPicker from '../inputs/ColorPicker';
import {
	IconButton,
	Slider,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import VelocitySlider from '../inputs/VelocitySlider';
import PositionInput from '../inputs/PositionInput';
import DeleteIcon from '@mui/icons-material/Delete';
import { GraphNode } from './Graph';

export interface GraphNodeSettingsProps {
	node: GraphNode;
	onChange: (node: GraphNode) => void;
	onRemove: () => void;
	running: boolean;
}

export default function (props: GraphNodeSettingsProps) {
	const handleChangeVelocityX = (value: number) => {
		props.onChange({
			...props.node,
			velocityX: value,
		});
	};

	const handleChangeVelocityY = (value: number) => {
		props.onChange({
			...props.node,
			velocityY: value,
		});
	};

	const handleChangeColor = (value: string) => {
		props.onChange({
			...props.node,
			color: value,
		});
	};

	const handleChangeStartX = (value: number) => {
		props.onChange({
			...props.node,
			startPoint: {
				...props.node.startPoint,
				x: value,
			},
		});
	};

	const handleChangeStartY = (value: number) => {
		props.onChange({
			...props.node,
			startPoint: {
				...props.node.startPoint,
				y: value,
			},
		});
	};

	return (
		<Stack alignItems="center" direction="row" spacing={2.5}>
			<ColorPicker
				value={props.node.color}
				onChange={handleChangeColor}
			/>
			<Stack alignItems="center" style={{ flex: 1 }}>
				<VelocitySlider
					value={props.node.velocityX}
					onChange={handleChangeVelocityX}
					min={-20}
					max={20}
				/>
				<Typography variant="subtitle2" gutterBottom>
					v<sub>x</sub>
				</Typography>
			</Stack>
			<Stack alignItems="center" style={{ flex: 1 }}>
				<VelocitySlider
					value={props.node.velocityY}
					onChange={handleChangeVelocityY}
					min={-20}
					max={20}
				/>
				<Typography variant="subtitle2" gutterBottom>
					v<sub>y</sub>
				</Typography>
			</Stack>
			<Stack alignItems="center" style={{ flex: 1 }} spacing={1}>
				<PositionInput
					value={props.node.startPoint.x}
					onChange={handleChangeStartX}
					label="x"
					disabled={props.running}
				/>
				<PositionInput
					value={props.node.startPoint.y}
					onChange={handleChangeStartY}
					label="y"
					disabled={props.running}
				/>
			</Stack>
			<IconButton
				size="small"
				onClick={props.onRemove}
				disabled={props.running}
			>
				<DeleteIcon />
			</IconButton>
		</Stack>
	);
}
