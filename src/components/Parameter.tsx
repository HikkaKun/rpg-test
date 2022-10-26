import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { clamp } from '../Utils/Utils';

interface ParameterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	min?: number | (() => number);
	max?: number | (() => number);
	initial: number;
	updateInParent: (value: number) => void;
	text: string;
}

function Parameter({ min = 0, max = 20, initial, updateInParent, className, text, ...props }: ParameterProps) {
	const calculatedInitial = calculateCount(initial);

	if (initial !== calculatedInitial) {
		updateInParent(calculatedInitial);
	}

	function increase() {
		changeCount(initial + 1)
	}

	function decrease() {
		changeCount(initial - 1)
	}

	function handleInputChange(event: any) {
		changeCount(parseInt(event.target.value));
	}

	function changeCount(value: number) {
		updateInParent(calculateCount(value));
	}

	function calculateCount(value: number) {
		const minCount = min instanceof Function ? min() : min;
		const maxCount = max instanceof Function ? max() : max;

		return clamp(value, minCount, maxCount)
	}

	return (
		<div className={className} {...props}>
			<label>{text}</label>
			<button onClick={decrease}>-</button>
			<input
				type="number"
				value={initial}
				onChange={handleInputChange}
			/>
			<button onClick={increase}>+</button>
		</div>
	)
}

export default Parameter;