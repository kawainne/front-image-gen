import React, { useState } from 'react';
import { useEffect } from 'react';

const Count = () => {
	const [counter, setCounter] = useState(0);

	const handleIncrement = () => {
		setCounter(counter + 1);
		localStorage.setItem('counter', counter + 1);
	};

	const handleDecrement = () => {
		setCounter(counter - 1);
		localStorage.setItem('counter', counter - 1);
	};

	useEffect(() => {
		const storedCounter = localStorage.getItem('counter');
		if (storedCounter) {
			setCounter(parseInt(storedCounter));
		}
	}, []);
	return (
		<div>
			<h1>Counter: {counter}</h1>
			<button onClick={handleIncrement}>Increment</button>
			<button onClick={handleDecrement}>Decrement</button>
		</div>
	);
};

export default Count;
