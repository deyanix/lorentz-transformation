import { GraphProps } from './Graph';
import GraphCanvas from './GraphCanvas';

export default function (props: GraphProps) {
	return (
		<GraphCanvas
			width={props.width}
			height={props.height}
			drawInitial={(ctx) => {
				ctx.strokeStyle = 'rgb(0, 0, 0)';
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(props.width / 2, 0);
				ctx.lineTo(props.width / 2, props.height);
				ctx.moveTo(0, props.height / 2);
				ctx.lineTo(props.width, props.height / 2);
				ctx.stroke();
			}}
		/>
	);
}
