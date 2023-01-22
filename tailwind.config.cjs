/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{js,jsx}'],
	theme: {
		extend: {
			screens: {
				xs: '480px',
			},
			fontFamily: {
				inter: ['Inter var', 'sans-serif'],
			},
			boxShadow: {
				card: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)',
				cardhover: '0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)',
			},
			animation: {
				tilt: 'tilt 2s infinite linear',
			},
			keyframes: {
				tilt: {
					'0%, 50%, 100%': {
						transform: 'rotate(0deg)',
					},
					'25%': {
						transform: 'rotate(1deg)',
					},
					'75%': {
						transform: 'rotate(-1deg)',
					},
				},
			},
		},
	},
	plugins: [],
};
