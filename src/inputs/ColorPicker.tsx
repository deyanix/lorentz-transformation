import { Box, ButtonBase, Fade, Popper } from '@mui/material';
import {
	useState,
	MouseEvent as ReactMouseEvent,
	useRef,
	useEffect,
} from 'react';
import { HexColorPicker } from 'react-colorful';

export interface ColorPickerProps {
	disabled?: boolean;
	value?: string;
	onChange?: (newValue: string) => void;
}

export default function (props: ColorPickerProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const colorPickerRef = useRef<HTMLDivElement>(null);

	const handleClick = (event: ReactMouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (
				!buttonRef.current?.contains(e.target as Node) &&
				!colorPickerRef.current?.contains(e.target as Node)
			) {
				setAnchorEl(null);
			}
		};

		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	}, []);

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	return (
		<>
			<ButtonBase
				ref={buttonRef}
				sx={{
					width: 20,
					height: 20,
					background: props.value,
					borderRadius: '100%',
					boxShadow:
						'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
				}}
				onClick={handleClick}
				disabled={props.disabled}
			/>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<div ref={colorPickerRef}>
					<HexColorPicker
						color={props.value}
						onChange={props.onChange}
						style={{ margin: '4px' }}
					/>
				</div>
			</Popper>
		</>
	);
}
