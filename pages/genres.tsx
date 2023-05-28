import { motion as m } from 'framer-motion';
import Link from 'next/link';
import { Movies } from '../utils/Movies';
import { useState, useEffect } from 'react';
import { userStore } from '../utils/UesrStore';

export default function Genres() {
	const [genres, setGenres] = useState(userStore.getGenre());
	const [selectedGenre, setSelectedGenre] = useState([]);

	return (
		<m.div
			initial={{ y: '100%' }}
			animate={{ y: '0%' }}
			transition={{ duration: 0.5, ease: 'easeInOut' }}
			exit={{ opacity: 1 }}
			className=' absolute top-0 left-0 w-full h-full bg-slate-50 pt-28 flex flex-col justify-center items-center'
		>
			<h1>Genres</h1>
			<h3>Let's pick some genres you're interested in</h3>
			<ul className=' list-none flex flex-wrap justify-center items-center'>
				{genres.map((genre) => {
					return (
						<button
							className={`  ${genre.selected ? ' bg-green-400' : ''}`}
							onClick={() => {
								const newArr = genres.map((curGen) => {
									if (curGen.id === genre.id) {
										curGen.selected = !curGen.selected;
									}
									return curGen;
								});
								setGenres(newArr);
								console.log(genres);
							}}
						>
							{genre.name}
						</button>
					);
				})}
			</ul>
			<Link href='/services'>services -</Link>
		</m.div>
	);
}
