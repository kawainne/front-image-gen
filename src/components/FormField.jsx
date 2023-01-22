import React from 'react';

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  labelName
	return (
		<div>
			<div className='flex items-center gap-2 mb-2'>
				<label htmlFor={name} className='block font-medium text-gray-900 text-sm'>
					{labelName}
				</label>
				{isSurpriseMe && (
					<button
						type='button'
						className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black hover:bg-[#D1D1D6]'
						onClick={handleSurpriseMe}>
						Random Text
					</button>
				)}
			</div>
			<input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				required
				className='bg-gray-50 focus:ring-[#6469ff] focus:border-[#6469ff] block w-full shadow-sm sm:text-sm border-gray-300  text-gray-900 outline-none p-3 rounded-lg border'
			/>
		</div>
	);
};

export default FormField;
