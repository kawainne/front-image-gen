import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

export const getRandomPrompt = (prompts) => {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	if (randomPrompt === prompts) return getRandomPrompt(prompts);

	return randomPrompt;
};

export async function downloadImage(_id, photo) {
	FileSaver.saveAs(photo, `downloaded-${_id}.jpg`);
}
