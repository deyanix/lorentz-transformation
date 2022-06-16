import MainCanvas from './MainCanvas';
import PointCanvas from './PointCanvas';
import TrackCanvas from './TrackCanvas';
import { Stack, Typography } from '@mui/material';

export interface GraphNode {
	id: number;
	color: string;
	startPoint: GraphPoint;
	velocityX: number;
	velocityY: number;
}

export interface GraphPoint {
	x: number;
	y: number;
}

export type GraphTransformation = (node: GraphNode, t: number) => GraphPoint;

export interface GraphProps {
	width: number;
	height: number;
	name: string;
	transformation: GraphTransformation;
	nodes: GraphNode[];
}

export default function (props: GraphProps): JSX.Element {
	return (
		<Stack alignItems="center">
			<Typography variant="h6">{props.name}</Typography>
			<div
				style={{
					position: 'relative',
					border: '1px solid black',
					width: `${props.width}px`,
					height: `${props.height}px`,
					boxSizing: 'content-box',
				}}
			>
				<MainCanvas {...props} />
				<TrackCanvas {...props} />
				<PointCanvas {...props} />
			</div>
		</Stack>
	);
}
