import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { userStore } from '../utils/UesrStore';
import { motion as m } from 'framer-motion';

export default function Home() {
	function printGenre() {
		console.log(userStore.getGenre());
	}
	useEffect(() => {
		userStore.fetchGenres();
		userStore.fetchStreaming();
		userStore.finalMovies = [];
	}, []);
	return (
		<m.div>
			<Head>
				<title>Film Selector | Home</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='description' content='Find your next fav here' />
			</Head>
			<m.div
				className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full bg-orange-300 pt-28'
				initial={{ y: '100%' }}
				animate={{ y: '0%' }}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
				exit={{ opacity: 1 }}
			>
				<h1 className='text-5xl'>Welcome to film selector</h1>
				<p className='text-xl'>Find your next fav here</p>
				<div className='flex items-center justify-center'>
					<Link href={'/results'} className='btn btn-outline mx-5'>
						I'm feeling
						<br /> lucky
					</Link>
					<Link href={'/genres'} className='btn btn-outline mx-5'>
						Let's Go!
					</Link>
					<button className='btn' onClick={printGenre}>
						{' '}
						sowg
					</button>
				</div>
			</m.div>
		</m.div>
	);
}
