import { hot } from 'react-hot-loader/root';
import React, { Suspense, useState } from 'react';
import { Button, Container, CssBaseline, Grid, Stack } from '@mui/material';
import Graph, { GraphNode } from './components/Graph';
import GraphSettings, {
	createDefaultNode,
	GraphInstance,
} from './components/GraphSettings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const App = () => {
	const [running, setRunning] = useState<boolean>(false);
	const [instance, setInstance] = useState<GraphInstance>({
		lightVelocity: 1,
		otherFrameVelocity: 5,
		nodes: [createDefaultNode()],
	});

	return (
		<>
			<CssBaseline />
			<Container>
				<Grid container spacing={2} padding={3} justifyContent="center">
					<Grid item>
						<Graph
							width={400}
							height={400}
							name="Mój układ"
							nodes={instance.nodes}
							transformation={(node, t) => ({
								x: node.velocityX * t,
								y: node.velocityY * t,
							})}
						/>
					</Grid>
					<Grid item>
						<Graph
							width={400}
							height={400}
							name="Stefana układ"
							nodes={instance.nodes}
							transformation={(node, t) => ({
								x: node.velocityX * t,
								y: node.velocityY * t,
							})}
						/>
					</Grid>
					<Grid item xs={12}>
						{!running && (
							<Button
								onClick={() => setRunning(true)}
								startIcon={<PlayArrowIcon />}
							>
								Run
							</Button>
						)}
						{running && (
							<Button
								onClick={() => setRunning(false)}
								startIcon={<PauseIcon />}
							>
								Stop
							</Button>
						)}
						<GraphSettings
							instance={instance}
							onChange={setInstance}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default hot(App);
