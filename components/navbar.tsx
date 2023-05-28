import Link from 'next/link';
export default function Navbar() {
    const available = 1000
	return (
		<>
			<input type='checkbox' id='my-modal-4' className='modal-toggle' />
			<label htmlFor='my-modal-4' className='modal cursor-pointer'>
				<label className='modal-box relative' htmlFor=''>
					<h3 className='text-lg font-bold'>
						Congratulations random Internet user!
					</h3>
					<p className='py-4'>
						You've been selected for a chance to get one year of subscription to
						use Wikipedia for free!
					</p>
				</label>
			</label>
			<nav className='flex justify-between items-center list-none py-4 px-6 z-50'>
				<Link href='/about'>
					<li>About</li>
				</Link>
				<Link href='/' className=' text-3xl'>
					<li>Film Selector</li>
				</Link>
				<li>
					<label htmlFor='my-modal-4' className=''>
						open modal
					</label>
				</li>
				<li>
					<div className='flex flex-col items-center justify-center'>
                        <p className=' text-sm'>available:</p>
                        <p className='grow text-2xl'>{available}</p>
                    </div>
				</li>
			</nav>
		</>
	);
}
