import { Stats, StatsAction } from '../App';
import { parseJsonFile } from '../Utils/Utils';

interface ImportButtonProps {
	dispatch: (action: StatsAction) => void;
}

function ImportButton({ dispatch }: ImportButtonProps) {
	return (
		<>
			<label htmlFor="importStats" className="customButton">Загрузить</label>
			<input id="importStats" type="file" onChange={async (event) => {
				if (event?.target?.files) {
					const data = await parseJsonFile(event.target.files[0]) as Stats;
					dispatch({ change: data });
				}
			}} />
		</>
	)
}

export default ImportButton;