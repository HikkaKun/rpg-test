import { animated, useSpring } from '@react-spring/web';
import classNames from 'classnames';
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import { Stats, StatsAction } from '../App';
import { clamp } from '../Utils/Utils';

interface ParameterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	min?: number;
	max?: number;
	isLocked?: boolean
	level: number;
	property: keyof Stats;
	dispatch: (action: StatsAction) => void;
	text: string;
}

function Parameter({ min = 0, max = 5, level, dispatch, property, children, text, isLocked = false, className, ...props }: ParameterProps) {
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
	}, [clampedLevel, max])

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
		<animated.div style={styles} className={classNames('param', className)}>
			<div>{text}</div>
			<div className='changeButtonsContainer'>
				<button onClick={decrease} className='changeButton' disabled={isLocked || level === min}>-</button>
				{children}
				<button onClick={increase} className='changeButton' disabled={isLocked || level === max}> +</button>
			</div>
		</animated.div>
	)
}

export default Parameter;

export type { ParameterProps }