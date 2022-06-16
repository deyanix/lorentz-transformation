import { GraphProps } from './Graph';
import GraphCanvas from './GraphCanvas';
import { useCallback } from 'react';

export default function (props: GraphProps) {
	const draw = useCallback((ctx, frameCount) => {
		props.nodes.forEach((node) => {
			const currentPoint = props.transformation(node, frameCount);
			ctx.fillStyle = node.color;
			ctx.strokeStyle = node.color;
			ctx.beginPath();
			ctx.arc(
				props.width / 2 + node.startPoint.x + currentPoint.x,
				props.height / 2 + node.startPoint.y + currentPoint.y,
				3,
				0,
				2 * Math.PI
			);
			ctx.fill();
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
