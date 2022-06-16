import { GraphNode, GraphPoint, GraphProps } from './Graph';
import GraphCanvas from './GraphCanvas';
import { useCallback, useEffect, useState } from 'react';

export interface TrackNode extends GraphNode {
	lastPoint?: GraphPoint;
}

export default function (props: GraphProps) {
	const [nodes, setNodes] = useState<TrackNode[]>(props.nodes);

	useEffect(() => {
		setNodes(props.nodes);
	}, [props]);

	const draw = useCallback((ctx, frameCount) => {
		nodes.forEach((node) => {
			const currentPoint = props.transformation(node, frameCount);
			const lastPoint = node.lastPoint || { x: 0, y: 0 };
			ctx.fillStyle = node.color;
			ctx.strokeStyle = node.color;
			ctx.beginPath();
			ctx.moveTo(
				props.width / 2 + node.startPoint.x + lastPoint.x,
				props.height / 2 + node.startPoint.y + lastPoint.y
			);
			ctx.lineTo(
				props.width / 2 + node.startPoint.x + currentPoint.x,
				props.height / 2 + node.startPoint.y + currentPoint.y
			);
			ctx.stroke();
		});
	}, []);

	return (
		<GraphCanvas
			width={props.width}
			height={props.height}
			clear
			draw={draw}
		/>
	);
}
