import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, FormField, Loader } from '../components';
import Animation from '../components/Animation';

const RenderCards = ({ data, title }) => {
	if (data?.length > 0) {
		return data?.map((post) => <Card key={post._id} {...post} />);
	}

	return <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>;
};

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState(null);

	const [searchText, setSearchText] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [searchedResults, setSearchedResults] = useState(null);

	const fetchPosts = async () => {
		setLoading(true);

		try {
			const response = await fetch('http://localhost:5000/api/posts', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const result = await response.json();
				setAllPosts(result.data.reverse());
			}
		} catch (err) {
			alert(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		setSearchTimeout(
			setTimeout(() => {
				const searchResult = allPosts.filter(
					(item) =>
						item.name.toLowerCase().includes(searchText.toLowerCase()) ||
						item.prompt.toLowerCase().includes(searchText.toLowerCase())
				);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

	return (
		<Animation>
			<section className='max-w-7xl mx-auto'>
				<div>
					<h1 className='font-extrabold text-[#222328] lg:text-3xl xl:text-4xl text-[18px] sm:text-[25px]'>
						The
						<span className='relative bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent mx-2'>
							Comunity
						</span>
						Showcase
					</h1>
					<p className='mt text-[#666e75] text-[14px] pt-1 2xl:text-[14px]  max-w-[500px] 2xl:max-w-[450px]'>
						DALL-E is a generative model created by OpenAI that can generate unique images from text prompts
					</p>
				</div>
				<div className='mt-16'>
					<FormField
						labelName='Search Posts'
						type='text'
						name='text'
						placeholder='Search Posts'
						value={searchText}
						handleChange={handleSearchChange}
					/>
				</div>
				<div className='mt-10'>
					{loading ? (
						<div className='flex justify-center items-center'>
							<Loader />
						</div>
					) : (
						<>
							{searchText && (
								<h2 className='font-medium text-[#666e75] text-xl mb-3'>
									{' '}
									Showing results for <span className='text-[#222328]'>{searchText}</span>
								</h2>
							)}
							<div className='grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
								{searchText ? (
									<RenderCards data={searchedResults} title='No results found' />
								) : (
									<RenderCards data={allPosts} title='No posts found' />
								)}
							</div>
						</>
					)}
				</div>
			</section>
		</Animation>
	);
};

export default Home;
