interface ExportButtonProps {
	data: any
}

function ExportButton({ data }: ExportButtonProps) {
	return (
		<a
			href={`data:text/json;charset=uft-8, ${encodeURIComponent(JSON.stringify(data))}`}
			download="character.json"
			target="_blank"
			rel="noreferrer"
		>
			<label className="custom-button">Сохранить</label>
		</a>
	)
}

export default ExportButton;

export type { ExportButtonProps }