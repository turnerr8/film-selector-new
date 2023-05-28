import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { userStore } from '../utils/UesrStore';

export default function Results() {
	const [isLoading, setIsLoading] = useState(false);
	userStore.fetchResults();

	return (
		<>
			{isLoading && (
				<m.div
					initial={{ y: '100%' }}
					animate={{ y: '0%' }}
					transition={{ duration: 0.5, ease: 'easeInOut' }}
					exit={{ opacity: 0 }}
					className=' absolute top-0 left-0 w-full h-full bg-red-500 flex flex-col justify-center items-center z-50'
				>
					loading
				</m.div>
			)}
			<div className='absolute top-0 left-0 w-full h-full bg-slate-50 flex flex-col justify-center items-center'></div>
		</>
	);
}
