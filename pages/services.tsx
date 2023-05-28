import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { userStore } from '../utils/UesrStore';

export default function Services() {
	const [provider, setProvider] = useState(userStore.getProvider());
	return (
		<m.div
			initial={{ y: '100%' }}
			animate={{ y: '0%' }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
			exit={{ opacity: 1 }}
			className=' absolute top-0 left-0 w-full h-full  bg-orange-300 pt-28 flex flex-col justify-center items-center'
		>
			<h1>Services</h1>
			<ul className=' list-none flex flex-wrap justify-center items-center'>
				{provider.map((curSer) => {
					return (
						<li key={curSer.id}>
							<button className='btn'>{curSer.name}</button>
						</li>
					);
				})}
			</ul>
		</m.div>
	);
}
