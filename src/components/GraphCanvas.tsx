import { useEffect, useRef } from 'react';

export type GraphCanvasDraw = (
	ctx: CanvasRenderingContext2D,
	frameCount: number
) => void;

export interface GraphCanvasProps {
	width: number;
	height: number;
	draw?: GraphCanvasDraw;
	drawInitial?: GraphCanvasDraw;
	clear?: boolean;
}

export default function (props: GraphCanvasProps): JSX.Element {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');
		let initialized = false;
		let frameCount = 0;
		let animationFrameId: number;

		const render = () => {
			if (context) {
				if (props?.clear) {
					context.clearRect(0, 0, props.width, props.height);
				}

				if (!initialized) {
					props?.drawInitial?.(context, frameCount);
					initialized = true;
				}
				props?.draw?.(context, frameCount);
				frameCount += 0.1;
			}
			animationFrameId = window.requestAnimationFrame(render);
		};

		render();
		return () => {
			window.cancelAnimationFrame(animationFrameId);
		};
	}, [props.draw, props.drawInitial]);

	return (
		<canvas
			ref={canvasRef}
			width={props.width}
			height={props.height}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
			}}
		/>
	);
}
