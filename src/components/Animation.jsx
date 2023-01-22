import React from 'react';
import { motion } from 'framer-motion';

const animation = {
	initial: { opacity: 0, y: 100 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -100 },
};

const Animation = ({ children }) => {
	return (
		<motion.div variants={animation} initial='initial' animate='animate' exit='exit' transition={{ duration: 0.5 }}>
			{children}
		</motion.div>
	);
};

export default Animation;
