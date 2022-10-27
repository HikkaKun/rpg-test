export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

export async function parseJsonFile(file: Blob) {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()
		fileReader.onload = event => resolve(JSON.parse(event.target!.result as string));
		fileReader.onerror = error => reject(error);
		fileReader.readAsText(file);
	});
}