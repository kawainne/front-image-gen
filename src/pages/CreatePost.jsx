import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { FormField, Loader } from '../components';
import { getRandomPrompt } from '../utils';
import { useEffect } from 'react';
import Animation from '../components/Animation';

export const BASEURL = process.env.FETCH_API;

const CreatePost = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: '',
		prompt: '',
		photo: '',
	});
	const [generatingImg, setGeneratingImg] = useState(false);
	const [loading, setLoading] = useState(false);
	const [limit, setLimit] = useState(0);

	const limitReached = true ? limit >= 3 : false;
	const shareBeforaGenerate = true ? !form.photo : false;

	// create function to handle limit of 3 images per day save to local storage
	const handleLimit = () => {
		setLimit((prev) => prev + 1);
		localStorage.setItem('limit', limit + 1);
	};

	const generateImage = async () => {
		if (limit >= 3) {
			alert('You have reached your limit for today');
			return;
		}

		if (form.prompt) {
			try {
				setGeneratingImg(true);
				const response = await fetch(`${BASEURL}/api/v1/dalle`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ prompt: form.prompt }),
				});
				const data = await response.json();
				setForm((prev) => ({ ...prev, photo: `data:image/jpeg;base64,${data.photo}` }));
				handleLimit();
			} catch (err) {
				alert('Something went wrong');
				console.log(err);
			} finally {
				setGeneratingImg(false);
			}
		} else {
			alert('Please enter a prompt');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.prompt && form.photo) {
			setLoading(true);
			try {
				const response = await fetch(`${BASEURL}/api/posts`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(form),
				});
				await response.json();

				navigate(`/`);
			} catch (err) {
				alert('Something went wrong or you limit has reached');
				console.log(err);
			} finally {
				setLoading(false);
			}
		} else {
			alert('Please generate an image first');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm((prev) => ({ ...prev, prompt: randomPrompt }));
	};

	useEffect(() => {
		const limit = localStorage.getItem('limit');
		if (limit) {
			setLimit(parseInt(limit));
		}
	}, []);

	return (
		<Animation>
			<section className='max-w-7xl mx-auto'>
				<div>
					<h1 className='font-extrabold text-[#222328] text-xl md:text-4xl tracking-wide'>Create</h1>
					<p className='mt text-[#666e75] text-[14px] max-w-[500px]'>
						Create generative model created by OpenAI that can generate unique images from text prompts and share it
						with the community to get feedback and upvotes from other users.
					</p>
				</div>
				<form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-5'>
						<FormField
							labelName='Your Name'
							type='text'
							name='name'
							placeholder='Jphn'
							value={form.name}
							handleChange={handleChange}
						/>
						<FormField
							labelName='Prompt'
							type='text'
							name='prompt'
							placeholder='an astronaut lounging in a tropical resort in space, vaporwave'
							value={form.prompt}
							handleChange={handleChange}
							isSurpriseMe
							handleSurpriseMe={handleSurpriseMe}
						/>
						<div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 justify-center items-center'>
							{form.photo ? (
								<img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
							) : (
								<img src={preview} alt='preview' className='w-ful h-full object-cover opacity-40' />
							)}
							{generatingImg && (
								<div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
									<Loader />
								</div>
							)}
						</div>
					</div>
					<div className='mt-5 flex gap-5 items-center '>
						<button
							type='button'
							onClick={generateImage}
							disabled={limitReached}
							className={`text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5
           py-2.5 text-center ${limitReached ? 'opacity-50 cursor-not-allowed' : ''}`}>
							{generatingImg ? 'Generating...' : 'Generate'}
						</button>
						<p>
							{limitReached ? (
								<span className='text-red-500'>You have reached your limit</span>
							) : (
								<span className='text-[#666e75] text-[14px]'>You have {limit} / 3 images left today</span>
							)}
						</p>
					</div>
					<div className='mt-10'>
						<p className='mt-2 text-[#666e75] text-[14px]'>
							One of the most important things to keep in mind when creating a generative model is to make sure that the
							model is not biased.
						</p>
						<button
							type='submit'
							disabled={shareBeforaGenerate}
							className={`mt-3 text-white bg-[#6469ff] ${
								shareBeforaGenerate ? 'opacity-50 cursor-not-allowed' : ''
							}  font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center`}>
							{loading ? 'Sharing' : 'Share with the community'}
						</button>
					</div>
				</form>
			</section>
		</Animation>
	);
};

export default CreatePost;
