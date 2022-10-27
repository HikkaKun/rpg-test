import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import { Stats, StatsAction } from '../App';
import { clamp } from '../Utils/Utils';

interface ParameterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	min?: number | (() => number);
	max?: number | (() => number);
	level: number;
	property: keyof Stats;
	dispatch: (action: StatsAction) => void;
	text: string;
}

function Parameter({ min = 0, max = 5, level, dispatch, property, children, text, ...props }: ParameterProps) {
	const clampedLevel = calculateLevel(level);

	useEffect(() => {
		if (level !== clampedLevel) {
			dispatch({ property, change: clampedLevel });
		}
	});

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
		const minCount = min instanceof Function ? min() : min;
		const maxCount = max instanceof Function ? max() : max;

		return clamp(value, minCount, maxCount)
	}

	return (
		<div {...props}>
			<label>{text}</label>
			<button onClick={decrease}>-</button>
			{children}
			<button onClick={increase}>+</button>
		</div>
	)
}

export default Parameter;

export type { ParameterProps }