import React, { useState } from 'react';

// bg-[#6469ff]
const Beta = () => {
	const [show, setShow] = useState(false);

	const handleShow = () => {
		setShow((e) => !e);
	};

	return (
		<div className='relative group'>
			{show ? (
				<>
					<div className='absolute -inset-0.5  bg-gradient-to-r from-pink-600 to bg-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt' />
					<div className='grid w-full gap-8 items-start justify-center '>
						<button
							className='relative bg-white rounded-lg  flex items-center divide-x divide-gray-800  lg:px-7 lg:py-4 px-2 py-3 text-sm md:text-base'
							onClick={handleShow}>
							<span className='text-black pr-2   lg:pr-6 flex items-center space-x-5'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='w-6 h-6 text-pink-600 -rotate-6 mr-2'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'
									/>
								</svg>
								Beta
							</span>
							<span className='text-black pl-2 lg:pl-6 w-full group-hover:text-gray-600 transition duration-200'>
								Follow us &rarr;
							</span>
						</button>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Beta;
