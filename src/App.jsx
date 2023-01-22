import React from 'react';
import logo from './assets/logo.svg';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { CreatePost, Home } from './pages';
import Count from './pages/Count';
import Beta from './components/Beta';

const App = () => {
	return (
		<BrowserRouter>
			<header
				className='relative w-full flex justify-between items-center bg-white sm:px-8 px-4 py-3
			 border-b border-b-[#e6ebf4]'>
				<Link to='/'>
					<img src={logo} alt='logo' className='w-28 object-contain' />
				</Link>
				<Link
					to='/create-post'
					className='font-inter font-medium bg-[#6469ff] hover:bg-[#454bfa] text-white px-4 py-2 rounded-md '>
					Create
				</Link>
				<div className='absolute top-[50%] left-[50%] translate-x-[-50%]'>
					<Beta />
				</div>
			</header>
			<main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/create-post' element={<CreatePost />} />
					<Route path='/count' element={<Count />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
