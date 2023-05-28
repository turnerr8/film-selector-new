import 'styles/globals.css';
import Navbar from '../components/navbar';
import { AnimatePresence } from 'framer-motion';

export default function MyApp({ Component, pageProps, router }) {
	return (
		<div className='flex flex-col h-screen p-6'>
			<Navbar />
			<AnimatePresence initial={false} >
				<Component key={router.pathname} {...pageProps} />
			</AnimatePresence>
		</div>
	);
}
