import { hot } from 'react-hot-loader/root';
import React, { Suspense, useCallback, useState } from 'react';
import { Button, Container, CssBaseline, Grid, Stack } from '@mui/material';
import Graph, { GraphNode } from './components/Graph';
import GraphSettings, {
	createDefaultNode,
	GraphInstance,
} from './components/GraphSettings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export const LIGHT_SPEED = 299792458;

const App = () => {
	const [running, setRunning] = useState<boolean>(false);
	const [instance, setInstance] = useState<GraphInstance>({
		lightVelocity: 1,
		otherFrameVelocity: 5,
		nodes: [createDefaultNode()],
	});

	const handleInstanceChange = (instance: GraphInstance) => {
		setInstance(instance);
	};

	const originalTransformation = useCallback((node: GraphNode, t: number) => {
		return {
			x: node.velocityX * t,
			y: -node.velocityY * t,
		};
	}, []);

	const otherTransformation = useCallback(
		(node: GraphNode, t: number) => {
			const point = originalTransformation(node, t);
			const c = LIGHT_SPEED ** instance.lightVelocity;
			const v = instance.otherFrameVelocity;
			const x = point.x;
			const lambda = 1 / (1 - v ** 2 / c ** 2) ** 0.5;
			return {
				x: lambda * (x + v * t),
				y: point.y,
			};
		},
		[instance.otherFrameVelocity, instance.lightVelocity]
	);

	return (
		<>
			<CssBaseline />
			<Container>
				<Grid container spacing={2} padding={3} justifyContent="center">
					<Grid item>
						<Graph
							width={400}
							height={400}
							running={running}
							name="Mój układ"
							nodes={instance.nodes}
							transformation={otherTransformation}
						/>
					</Grid>
					<Grid item>
						<Graph
							width={400}
							height={400}
							running={running}
							name="Stefana układ"
							nodes={instance.nodes}
							transformation={originalTransformation}
						/>
					</Grid>
					<Grid item xs={12}>
						{running ? (
							<Button
								onClick={() => setRunning(false)}
								startIcon={<PauseIcon />}
							>
								Stop
							</Button>
						) : (
							<Button
								onClick={() => setRunning(true)}
								startIcon={<PlayArrowIcon />}
							>
								Run
							</Button>
						)}
						<GraphSettings
							instance={instance}
							onChange={handleInstanceChange}
							running={running}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default hot(App);
