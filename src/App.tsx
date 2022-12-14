import { useReducer } from 'react';
import ExportButton from './components/ExportButton';
import ImportButton from './components/ImportButton';
import Parameter, { ParameterProps } from './components/Parameter';
import './styles/App.css';

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
	property?: keyof Stats;
	change: number | Stats;
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
	if (action.change instanceof Object)
		return { ...action.change };

	const { property, change } = action;

	switch (property) {
		case 'intelligence':
			return { ...state, [property]: change, energy: state.dexterity + change };
		case 'dexterity':
			return { ...state, [property]: change, energy: state.intelligence + change, evasion: 10 + change }
		default:
			return { ...state, [property!]: change }
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
			<div className="export-import-container">
				<ExportButton data={stats} />
				<ImportButton dispatch={dispatchStats} />
			</div>


			{ComposeParameter("????????", "strength")}
			{ComposeParameter("????????????????", "dexterity")}
			{ComposeParameter("??????????????????", "intelligence")}
			{ComposeParameter("??????????????", "charisma")}

			{ComposeParameter("?????????????????? ????????", "life", `${life}/${strength + 3}`, { max: strength + 3 })}

			{ComposeParameter("??????????????????", "evasion", evasion, { isLocked: true, min: 10, max: 15 })}
			{ComposeParameter("????????????????????????", "energy", energy, { isLocked: true, max: 10 })}

			{ComposeParameter("??????????", "attack", `${attack}/${strength}`, { max: strength })}

			{ComposeParameter("??????????", "stealth", `${stealth}/${dexterity}`, { max: dexterity })}
			{ComposeParameter("???????????????? ???? ????????", "archery", `${archery}/${dexterity}`, { max: dexterity })}

			{ComposeParameter("??????????????????????", "learnability", `${learnability}/${intelligence}`, { max: intelligence })}
			{ComposeParameter("??????????????????", "survival", `${survival}/${intelligence}`, { max: intelligence })}
			{ComposeParameter("????????????????", "medicine", `${medicine}/${intelligence}`, { max: intelligence })}

			{ComposeParameter("??????????????????????", "intimidation", `${intimidation}/${charisma}`, { max: charisma })}
			{ComposeParameter("????????????????????????????????", "insight", `${insight}/${charisma}`, { max: charisma })}
			{ComposeParameter("?????????????? ??????", "appearance", `${appearance}/${charisma}`, { max: charisma })}
			{ComposeParameter("??????????????????????????????", "manipulation", `${manipulation}/${charisma}`, { max: charisma })}
		</div>
	);
}

export default App;

export type { Stats, StatsAction }