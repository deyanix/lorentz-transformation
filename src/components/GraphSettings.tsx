import {
	Box,
	Divider,
	Grid,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import GraphNodeSettings from './GraphNodeSettings';
import VelocitySlider from '../inputs/VelocitySlider';
import AddIcon from '@mui/icons-material/Add';
import { GraphNode } from './Graph';
import { useState } from 'react';
import { add } from 'lodash';
import React from 'react';

export interface GraphInstance {
	lightVelocity: number;
	otherFrameVelocity: number;
	nodes: GraphNode[];
}

export interface GraphSettingsProps {
	instance: GraphInstance;
	onChange: (instance: GraphInstance) => void;
}

export function randomHue(): string {
	return Math.floor(Math.random() * 255).toString(16);
}

export function randomColor(): string {
	return '#' + randomHue() + randomHue() + randomHue();
}

let graphNodeId = 0;
export function createDefaultNode(): GraphNode {
	return {
		id: graphNodeId++,
		startPoint: { x: 0, y: 0 },
		color: randomColor(),
		velocityY: 5,
		velocityX: 5,
	};
}

export default function (props: GraphSettingsProps) {
	const handleLightVelocityChange = (value: number) => {
		props.onChange({
			...props.instance,
			lightVelocity: value,
		});
	};

	const handleOtherFrameVelocityChange = (value: number) => {
		props.onChange({
			...props.instance,
			otherFrameVelocity: value,
		});
	};

	const handleNodeChange = (previousNode: GraphNode, newNode: GraphNode) => {
		const newNodes = props.instance.nodes;
		newNodes[newNodes.indexOf(previousNode)] = newNode;
		props.onChange({
			...props.instance,
			nodes: newNodes,
		});
	};

	const handleNodeRemove = (previousNode: GraphNode) => {
		props.onChange({
			...props.instance,
			nodes: props.instance.nodes.filter((n) => n !== previousNode),
		});
	};

	const addNode = () => {
		props.onChange({
			...props.instance,
			nodes: [...props.instance.nodes, createDefaultNode()],
		});
	};

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} md={4}>
				<Stack height={36} direction="row" alignItems="center">
					<Typography variant="subtitle2">Ustawienia</Typography>
				</Stack>
				<Paper variant="outlined" sx={{ padding: 2.5 }}>
					<Typography gutterBottom>Prędkość światła</Typography>
					<VelocitySlider
						value={props.instance.lightVelocity}
						onChange={handleLightVelocityChange}
						variant="logarithm"
						base={299792458}
						min={0}
						max={1}
						step={0.05}
					/>
					<Typography gutterBottom>
						Prędkość układu Stefana
					</Typography>
					<VelocitySlider
						value={props.instance.otherFrameVelocity}
						onChange={handleOtherFrameVelocityChange}
						min={-20}
						max={20}
					/>
				</Paper>
			</Grid>
			<Grid item xs={12} md={8}>
				<Stack
					height={36}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="subtitle2">Ciała</Typography>
					<IconButton size="small" onClick={addNode}>
						<AddIcon />
					</IconButton>
				</Stack>
				<Paper variant="outlined">
					{props.instance.nodes.map((node, i) => (
						<React.Fragment key={node.id}>
							<Box sx={{ padding: 2 }}>
								<GraphNodeSettings
									node={node}
									onChange={(newNode) =>
										handleNodeChange(node, newNode)
									}
									onRemove={() => handleNodeRemove(node)}
								/>
							</Box>
							{i !== props.instance.nodes.length - 1 && (
								<Divider />
							)}
						</React.Fragment>
					))}
				</Paper>
			</Grid>
		</Grid>
	);
}
