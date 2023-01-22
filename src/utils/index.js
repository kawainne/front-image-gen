import FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { surpriseMePrompts } from '../constants';


export const MySwal = withReactContent(Swal);

export const getRandomPrompt = (prompts) => {
	const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
	const randomPrompt = surpriseMePrompts[randomIndex];

	if (randomPrompt === prompts) return getRandomPrompt(prompts);

	return randomPrompt;
};

export async function downloadImage(_id, photo) {
	FileSaver.saveAs(photo, `downloaded-${_id}.jpg`);
}


