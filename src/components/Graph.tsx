import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

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
	running: boolean;
	transformation: GraphTransformation;
	nodes: GraphNode[];
}

const TIME_STEP = 1;
const MOTION_COFF = 0.01;

export default function (props: GraphProps): JSX.Element {
	const [lastPoints, setLastPoints] = useState<Record<number, GraphPoint>>(
		Object.fromEntries(props.nodes.map((n) => [n.id, n.startPoint]))
	);
	const mainCanvasRef = useRef<HTMLCanvasElement>(null);
	const pointCanvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		setLastPoints(
			Object.fromEntries(
				props.nodes.map((n) => [n.id, lastPoints[n.id] || n.startPoint])
			)
		);
	}, [...props.nodes]);

	useEffect(() => {
		if (!props.running) {
			return;
		}

		drawFrame();
		drawTrack(props.nodes);
		drawPoint(props.nodes);
		setLastPoints(
			Object.fromEntries(
				props.nodes.map((n) => {
					const lastPoint = lastPoints[n.id];
					const currentPoint = props.transformation(n, TIME_STEP);
					return [
						n.id,
						{
							x: lastPoint.x + currentPoint.x,
							y: lastPoint.y + currentPoint.y,
						},
					];
				})
			)
		);
	}, [props.running, lastPoints, props.transformation]);

	const drawFrame = useCallback(() => {
		const ctx = mainCanvasRef.current?.getContext('2d');
		if (!ctx) {
			return;
		}

		ctx.strokeStyle = 'rgb(0, 0, 0)';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(props.width / 2, 0);
		ctx.lineTo(props.width / 2, props.height);
		ctx.moveTo(0, props.height / 2);
		ctx.lineTo(props.width, props.height / 2);
		ctx.stroke();
	}, []);

	const drawPoint = useCallback(
		(nodes: GraphNode[]) => {
			const ctx = pointCanvasRef.current?.getContext('2d');
			if (!ctx) {
				return;
			}
			ctx.clearRect(0, 0, props.width, props.height);
			nodes.forEach((node) => {
				const currentPoint = props.transformation(node, TIME_STEP);
				const lastPoint = lastPoints[node.id];
				ctx.fillStyle = node.color;
				ctx.strokeStyle = node.color;
				ctx.beginPath();
				ctx.arc(
					props.width / 2 +
						(node.startPoint.x + lastPoint.x + currentPoint.x) *
							MOTION_COFF,
					props.height / 2 +
						(node.startPoint.y + lastPoint.y + currentPoint.y) *
							MOTION_COFF,
					3,
					0,
					2 * Math.PI
				);
				ctx.fill();
				ctx.stroke();
			});
		},
		[lastPoints]
	);

	const drawTrack = useCallback(
		(nodes: GraphNode[]) => {
			const ctx = mainCanvasRef.current?.getContext('2d');
			if (!ctx) {
				return;
			}

			nodes.forEach((node) => {
				const currentPoint = props.transformation(node, TIME_STEP);
				const lastPoint = lastPoints[node.id];
				ctx.fillStyle = node.color;
				ctx.strokeStyle = node.color;
				ctx.beginPath();
				ctx.moveTo(
					props.width / 2 +
						(node.startPoint.x + lastPoint.x) * MOTION_COFF,
					props.height / 2 +
						(node.startPoint.y + lastPoint.y) * MOTION_COFF
				);
				ctx.lineTo(
					props.width / 2 +
						(node.startPoint.x + lastPoint.x + currentPoint.x) *
							MOTION_COFF,
					props.height / 2 +
						(node.startPoint.y + lastPoint.y + currentPoint.y) *
							MOTION_COFF
				);
				ctx.stroke();
			});
		},
		[lastPoints]
	);

	useEffect(() => {
		setLastPoints(
			Object.fromEntries(props.nodes.map((n) => [n.id, n.startPoint]))
		);
		mainCanvasRef.current
			?.getContext('2d')
			?.clearRect(0, 0, props.width, props.height);
		pointCanvasRef.current
			?.getContext('2d')
			?.clearRect(0, 0, props.width, props.height);
	}, [props.running]);

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
				<canvas
					ref={mainCanvasRef}
					width={props.width}
					height={props.height}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				/>
				<canvas
					ref={pointCanvasRef}
					width={props.width}
					height={props.height}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				/>
			</div>
		</Stack>
	);
}
