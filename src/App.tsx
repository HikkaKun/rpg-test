import { useReducer, useState } from 'react';
import Parameter, { ParameterProps } from './components/Parameter';

interface Stats {
	//base stats
	strength: number;
	dexterity: number;
	intelligence: number;
	charisma: number;

	//calculated stats
	life: number;
	evasion: number;
	energy: number;

	//strength skills
	attack: number;

	//dexterity skills
	stealth: number;
	archery: number;

	//intelligence skills
	learnability: number;
	survival: number;
	medicine: number;

	//charisma skills
	intimidation: number;
	insight: number;
	appearance: number;
	manipulation: number;
}

interface StatsAction {
	property: keyof Stats
	change: number;
}

type ComposeParameterProps = Omit<ParameterProps, 'level' | 'text' | 'property' | 'children' | 'dispatch'>

const initialStats: Stats = {
	strength: 0,
	dexterity: 0,
	intelligence: 0,
	charisma: 0,
	life: 3,
	evasion: 10,
	energy: 0,
	attack: 0,
	stealth: 0,
	archery: 0,
	learnability: 0,
	survival: 0,
	medicine: 0,
	intimidation: 0,
	insight: 0,
	appearance: 0,
	manipulation: 0,
}

function reducer(state: Stats, action: StatsAction) {
	const { property, change } = action;
	switch (property) {
		case 'intelligence':
			return { ...state, [property]: change, energy: state.dexterity + change };
		case 'dexterity':
			return { ...state, [property]: change, energy: state.intelligence + change, evasion: 10 + change }
		default:
			return { ...state, [property]: change }
	}
}

function App() {

	const [stats, dispatchStats] = useReducer(reducer, initialStats);

	function ComposeParameter(text: string, property: keyof Stats, children?: any, { ...props }: ComposeParameterProps = {}) {
		const level = stats[property];

		return (
			<Parameter
				level={level}
				text={text}
				property={property}
				dispatch={dispatchStats}
				{...props}
			>
				{children ?? level}
			</Parameter>
		)
	}


	const {
		strength, dexterity, intelligence, charisma,
		life, evasion, energy,
		attack,
		stealth, archery,
		learnability, survival, medicine,
		intimidation, insight, appearance, manipulation } = stats;

	return (
		<div className="App">
			{ComposeParameter("Сила", "strength")}
			{ComposeParameter("Ловкость", "dexterity")}
			{ComposeParameter("Интеллект", "intelligence")}
			{ComposeParameter("Харизма", "charisma")}

			{ComposeParameter("Жизненная сила", "life", `${life}/${strength + 3}`, { max: () => strength + 3 })}

			<div>Уклонение: {evasion}</div>
			<div>Энергичность: {energy}</div>

			{ComposeParameter("Атака", "attack", `${attack}/${strength}`)}

			{ComposeParameter("Стелс", "stealth", `${stealth}/${dexterity}`)}
			{ComposeParameter("Стрельба из лука", "archery", `${archery}/${dexterity}`)}

			{ComposeParameter("Обучаемость", "learnability", `${learnability}/${intelligence}`)}
			{ComposeParameter("Выживание", "survival", `${survival}/${intelligence}`)}
			{ComposeParameter("Медицина", "medicine", `${medicine}/${intelligence}`)}

			{ComposeParameter("Запугивание", "stealth", `${intimidation}/${charisma}`)}
			{ComposeParameter("Проницательность", "stealth", `${insight}/${charisma}`)}
			{ComposeParameter("Внешний вид", "stealth", `${appearance}/${charisma}`)}
			{ComposeParameter("Манипулирование", "stealth", `${manipulation}/${charisma}`)}
		</div>
	);
}

export default App;

export type { Stats, StatsAction }