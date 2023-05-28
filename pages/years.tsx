import { motion as m } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
export default function Years() {
	const [startYear, setStartYear] = useState(null);
	const [endYear, setEndYear] = useState(new Date().getFullYear());
	const [startState, setStartState] = useState({
		correct: 2,
		message: 'default',
	});
	const [endState, setEndState] = useState({ correct: 2, message: '' });
	function handleStartInput(e) {
		const value = +e.target.value;
		console.log(typeof value);
		if (typeof value !== 'number') {
			setStartState({ correct: 0, message: 'not a number!' });
		} else {
			setStartYear(value);
		}
		console.log(startState.message);
	}
	return (
		<m.div
			initial={{ y: '100%' }}
			animate={{ y: '0%' }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
			exit={{ opacity: 1 }}
			className=' absolute top-0 left-0 w-full h-full bg-slate-50 pt-28 flex flex-col justify-center items-center'
		>
			<h1>Years</h1>
			<div className='flex justify-center items-center'>
				<label htmlFor='start-date'>start date</label>
				<input
					type='text'
					name='start-date'
					id='start-date'
					onChange={handleStartInput}
					className={` bg-white input input-bordered w-full max-w-xs ${
						startState.correct === 0
							? 'border-red-500'
							: startState.correct === 1
							? 'border-green-500'
							: ''
					}`}
					maxLength={4}
					placeholder='1895'
					value={startYear}
				/>
				<label htmlFor='end-date'>end date</label>
				<input
					type='text'
					name='end-date'
					id='end-date'
					className=' bg-white input input-bordered w-full max-w-xs'
					maxLength={4}
					placeholder={endYear.toString()}
					value={endYear}
				/>
			</div>
			<Link href='/results'>Lets go!</Link>
		</m.div>
	);
}
