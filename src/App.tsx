import { useState } from 'react';
import Parameter from './components/Parameter';

function App() {
	const [strength, setStrength] = useState(0);
	const [maxLife, setMaxLife] = useState(strength + 3);
	const [currentLife, setCurrentLife] = useState(maxLife);

	return (
		<div className="App">
			<Parameter
				initial={strength}
				text="Сила"
				updateInParent={(value) => {
					setStrength(value);
					setMaxLife(value + 3);
				}}
			/>
			<Parameter
				initial={currentLife}
				max={maxLife}
				text={`Жизненная сила ${currentLife}/${maxLife}`}
				updateInParent={(value) => {
					setCurrentLife(value)
				}}
			/>
			<div>Жизненная сила: {currentLife}/{maxLife}</div>
		</div>

	);
}

export default App;

{/* <Parameter
	text="Жизненная сила"
	updateInParent={(value) => console.log('health: ', value)}
	max={() => strength + 3}
/> */}