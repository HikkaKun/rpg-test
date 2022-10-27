import { animated, useSpring } from '@react-spring/web';
import { ReactNode, useEffect } from 'react';
import { Stats, StatsAction } from '../App';
import { clamp } from '../Utils/Utils';

interface ParameterProps {
	min?: number;
	max?: number;
	isLocked?: boolean
	level: number;
	property: keyof Stats;
	dispatch: (action: StatsAction) => void;
	text: string;
	children?: ReactNode;
}

function Parameter({ min = 0, max = 5, level, dispatch, property, children, text, isLocked = false }: ParameterProps) {
	const clampedLevel = calculateLevel(level);

	useEffect(() => {
		if (level !== clampedLevel) {
			dispatch({ property, change: clampedLevel });
		}
	});

	const [styles, api] = useSpring(() => ({ background: 'var(--white)' }));

	useEffect(() => {
		api.start({
			background: 'var(--white)',
			from: { background: 'var(--tint)' },
			config: { duration: 1000 }
		})
	}, [clampedLevel, max, api])

	function increase() {
		changeCount(level + 1)
	}

	function decrease() {
		changeCount(level - 1)
	}

	function changeCount(value: number) {
		dispatch({ property, change: calculateLevel(value) });
	}

	function calculateLevel(value: number) {
		return clamp(value, min, max);
	}

	return (
		<animated.div style={styles} className='param'>
			<div>{text}</div>
			<div className='change-buttons-container'>
				<button onClick={decrease} className='change-button' disabled={isLocked || level === min}>-</button>
				{children}
				<button onClick={increase} className='change-button' disabled={isLocked || level === max}> +</button>
			</div>
		</animated.div>
	)
}

export default Parameter;

export type { ParameterProps }